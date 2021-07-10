import createError from 'http-errors';
import { IUser } from '../../interfaces/IUser';
import {
  List,
  User,
  UserProfile,
  FriendRequest,
  FriendList,
} from '../../models/User';
import { verifyAccessToken } from '../../services/auth';

// PROFILE

export const createProfile = async (parent, args, context, info) => {
  try {
    // Get Access Token
    const accessToken = context.req.headers['authorization'];

    if (!accessToken)
      throw new createError.BadRequest('Access Token was not found.');

    // Verify Access Token
    const userId = await verifyAccessToken(
      context.req,
      context.res,
      accessToken
    );

    if (!userId) return new createError.Unauthorized();

    // Get Data
    const { description, color, favoriteAnime, favoriteManga, favoriteChar } =
      args.profile;

    // Get UserId & create UserProfile
    const currentUser = User.findById(userId);

    if (!(await currentUser).id) return new createError.Unauthorized();

    // Check if the current User already has a Profile
    if ((await currentUser).userprofile !== null)
      return new createError.BadRequest('Userprofile already exists.');

    if (currentUser) {
      const userprofile = new UserProfile({
        user: await currentUser,
        description: description,
        color: color,
        favoriteAnime: favoriteAnime,
        favoriteManga: favoriteManga,
        favoriteChar: favoriteChar,
      });

      const user = User.findByIdAndUpdate(userId, { userprofile: userprofile });
      (await user).save();
      await userprofile.save();

      return userprofile;
    } else return new createError.BadRequest('Could not find user.');
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = async (parent, args, context, info) => {
  try {
    // Get Access Token
    const accessToken = context.req.headers['authorization'];

    if (!accessToken)
      throw new createError.BadRequest('Access Token was not found.');

    // Verify Access Token
    const userId = await verifyAccessToken(
      context.req,
      context.res,
      accessToken
    );

    // get the current User
    const currentUser = await User.findById(userId);

    const id = currentUser.userprofile;

    if (!currentUser.userprofile)
      return new createError.NotFound('Could not update userprofile.');

    // Get the updated data for the userprofile
    const { description, color, favoriteAnime, favoriteManga, favoriteChar } =
      args.profile;

    // To only update the fields the user wants to we need to check which fields he updated

    const updates: any = {};

    if (description !== undefined) {
      updates.description = description;
    }
    if (color !== undefined) {
      updates.color = color;
    }
    if (favoriteAnime !== undefined) {
      updates.favoriteAnime = favoriteAnime;
    }
    if (favoriteManga !== undefined) {
      updates.favoriteManga = favoriteManga;
    }
    if (favoriteChar !== undefined) {
      updates.favoriteChar = favoriteChar;
    }

    // Search the userprofile with the ID
    const profile: any = await UserProfile.findByIdAndUpdate(id, updates, {
      new: true,
    });

    return {
      description: profile.description,
      color: profile.color,
      favoriteAnime: profile.favoriteAnime,
      favoriteManga: profile.favoriteManga,
      favoriteChar: profile.favoriteChar,
      user: currentUser,
    };
  } catch (error) {
    console.log(error);
  }
};

// USER

export const changeUsername = async (parent, args, context, info) => {
  try {
    // Get Access Token
    const accessToken = context.req.headers['authorization'];

    if (!accessToken)
      throw new createError.BadRequest('Access Token was not found.');

    // Verify Access Token
    const userId = await verifyAccessToken(
      context.req,
      context.res,
      accessToken
    );

    const { username } = args;

    const usernameExists = await User.findOne({ username: username });

    if (usernameExists)
      return new createError.Forbidden('Username is already taken.');

    const updates: any = {};

    if (username !== undefined) {
      updates.username = username;
    }

    const user = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    });

    return user;
  } catch (error) {
    console.log(error);
  }
};

// LIST

export const addList = async (parent, args, context, info) => {
  try {
    // Get Access Token
    const accessToken = context.req.headers['authorization'];

    if (!accessToken)
      throw new createError.BadRequest('Access Token was not found.');

    // Verify Access Token
    const userId = await verifyAccessToken(
      context.req,
      context.res,
      accessToken
    );

    const currentUser = User.findById(userId);

    if (!(await currentUser).list) {
      const {
        finishedAnimes,
        watchingAnimes,
        watchlistAnimes,
        finishedMangas,
        watchingMangas,
        watchlistMangas,
      } = args.list;

      if (currentUser) {
        const list = new List({
          user: await currentUser,
          finishedAnimes: finishedAnimes,
          watchingAnimes: watchingAnimes,
          watchlistAnimes: watchlistAnimes,

          finishedMangas: finishedMangas,
          watchingMangas: watchingMangas,
          watchlistMangas: watchlistMangas,
        });

        const user = User.findByIdAndUpdate(userId, { list: list });
        await (await user).save();
        await list.save();

        return list;
      } else {
        return new createError.BadRequest('User not found.');
      }
    } else {
      const listId = (await currentUser).list;

      const {
        finishedAnimes,
        watchingAnimes,
        watchlistAnimes,
        finishedMangas,
        watchingMangas,
        watchlistMangas,
      } = args.list;

      const list = await List.findByIdAndUpdate(listId, {
        finishedAnimes: finishedAnimes,
        watchingAnimes: watchingAnimes,
        watchlistAnimes: watchlistAnimes,

        finishedMangas: finishedMangas,
        watchingMangas: watchingMangas,
        watchlistMangas: watchlistMangas,
      });

      return list;
    }
  } catch (error) {
    console.log(error);
  }
};

export const sendFriendRequest = async (parent, args, context, info) => {
  try {
    // Get Access Token
    const accessToken = context.req.headers['authorization'];

    if (!accessToken)
      throw new createError.BadRequest('Access Token was not found.');

    // Verify Access Token
    const userId = await verifyAccessToken(
      context.req,
      context.res,
      accessToken
    );

    const { username } = args.request;

    const user: any = await User.findById(userId);

    if (username === '')
      return new createError.BadRequest('Please enter a username.');

    if ((await User.findOne({ username: username })) === null)
      return new createError.BadRequest(`${username} was not found.`);

    if (username === user.username)
      return new createError.BadRequest(
        "You can't add yourself to your friendlist."
      );

    const requestedUser = await User.findOne({ username: username });

    const friendlist = await FriendList.findById(user.friendlist);

    if (friendlist.friends.includes(requestedUser.id))
      return new createError.BadRequest(
        `You are already friends with ${username}.`
      );

    let friendlistArray: string[] = [];

    if (friendlist) {
      friendlist.friends.map((friend: any) => {
        friendlistArray.push(friend.username);
      });
    }

    const friendRequest = await FriendRequest.findById(
      requestedUser.friendrequest
    );

    if (friendRequest === null) {
      const request = new FriendRequest({
        user: requestedUser, // User that you want to add
        incomingUserId: userId, // Your user id
      });

      const updateUser = await User.findByIdAndUpdate(requestedUser.id, {
        friendrequest: request, // Update friendrequest field from user that you wanna add
      });

      await updateUser.save();
      await request.save();

      return {
        user: requestedUser,
        incomingUserId: userId,
      };
    } else {
      if (friendRequest.incomingUserId.includes(userId)) {
        return new createError.BadRequest('You already sent a friend request.');
      }

      friendRequest.incomingUserId.push(userId);
      await friendRequest.save();

      return {
        user: requestedUser,
        incomingUserId: userId,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

export const acceptFriendRequest = async (parent, args, context, info) => {
  try {
    // Get Access Token
    const accessToken = context.req.headers['authorization'];

    if (!accessToken)
      throw new createError.BadRequest('Access Token was not found.');

    // Verify Access Token
    const userId = await verifyAccessToken(
      context.req,
      context.res,
      accessToken
    );

    const { accept, id } = args.accept;

    const user = await User.findById(userId);

    const requests = await FriendRequest.findById(user.friendrequest);

    const requestingUser = await User.findById(id);

    if (accept === true) {
      if (user.friendlist === null) {
        const friendlist = new FriendList({
          user: user,
        });

        friendlist.friends.push(requestingUser.id);

        const updateUser = await User.findByIdAndUpdate(user.id, {
          friendlist: friendlist,
        });

        await updateUser.save();
        await friendlist.save();

        let currentRequest = requests.incomingUserId.indexOf(id);
        if (currentRequest > -1) {
          requests.incomingUserId.splice(currentRequest, 1);
        }

        await requests.save();
      } else {
        const friendlist = await FriendList.findById(user.friendlist);

        let friendlistArray: string[] = [];

        friendlist.friends.map((friend: any) => {
          friendlistArray.push(friend.username);
        });

        if (friendlistArray.includes(requestingUser.username))
          return new createError.BadRequest(
            `You already added ${requestingUser.username}!`
          );

        friendlist.friends.push(requestingUser.id);
        await friendlist.save();

        let currentRequest = requests.incomingUserId.indexOf(id);
        if (currentRequest > -1) {
          requests.incomingUserId.splice(currentRequest, 1);
        }

        await requests.save();
      }

      if (requestingUser.friendlist === null) {
        const friendlist2 = new FriendList({
          user: requestingUser,
        });

        friendlist2.friends.push(user.id);

        const updateUser2 = await User.findByIdAndUpdate(requestingUser.id, {
          friendlist: friendlist2,
        });

        await updateUser2.save();
        await friendlist2.save();
      } else {
        const friendlist2 = await FriendList.findById(
          requestingUser.friendlist
        );

        let friendlistArray2: string[] = [];

        friendlist2.friends.map((friend: any) => {
          friendlistArray2.push(friend.username);
        });

        if (friendlistArray2.includes(user.username))
          return new createError.BadRequest(
            `You already added ${user.username}!`
          );

        friendlist2.friends.push(user.id);
        await friendlist2.save();
      }
    } else if (accept === false) {
      let currentRequest = requests.incomingUserId.indexOf(id);
      if (currentRequest > -1) {
        requests.incomingUserId.splice(currentRequest, 1);
      }

      await requests.save();
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteFriend = async (parent, args, context, info) => {
  try {
    // Get Access Token
    const accessToken = context.req.headers['authorization'];

    if (!accessToken)
      throw new createError.BadRequest('Access Token was not found.');

    // Verify Access Token
    const userId = await verifyAccessToken(
      context.req,
      context.res,
      accessToken
    );

    const { id } = args;

    const user = await User.findById(userId);
    const deletingUser = await User.findById(id);

    if (user.friendlist !== null) {
      // delete the friend from your friendlist
      const friendlist = await FriendList.findById(user.friendlist);
      let currentFriend = friendlist.friends.indexOf(id);

      if (currentFriend > -1) {
        friendlist.friends.splice(currentFriend, 1);
      }

      // delete yourself from the friends friendlist
      const otherFriendlist = await FriendList.findById(
        deletingUser.friendlist
      );
      let currentUser = otherFriendlist.friends.indexOf(userId);

      if (currentUser > -1) {
        otherFriendlist.friends.splice(currentUser, 1);
      }

      await otherFriendlist.save();
      await friendlist.save();

      return `Deleted ${deletingUser.username} from your friendlist.`;
    } else {
      return new createError.BadRequest('No friendlist found.');
    }
  } catch (error) {
    console.log(error);
  }
};
