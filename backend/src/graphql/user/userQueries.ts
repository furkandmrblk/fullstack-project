import { FriendList, FriendRequest, List, User } from '../../models/User';
import { UserProfile } from '../../models/User';
import createError from 'http-errors';
import { verifyAccessToken } from '../../services/auth';

export const getUser = async (parent, args, context, info) => {
  const { id } = args;
  const user = await User.findById(id);
  const profile = await UserProfile.findById(user.userprofile);

  return {
    id: user.id,
    username: user.username,
    password: user.password,
    userprofile: profile,
  };
};

export const getUsers = async () => {
  const userRecords = await User.find();
  let users = [];

  for (let i = 0; i < userRecords.length; i++) {
    const currentUser: any = await User.findById(userRecords[i].id);
    const profile = await UserProfile.findById(currentUser.userprofile);

    const user = {
      id: currentUser.id,
      username: currentUser.username,
      password: currentUser.password,
      date: currentUser.date,
      lastTimeOnline: currentUser.lastTimeOnline,
      isOnline: currentUser.isOnline,
      userprofile: profile,
    };

    users.push(user);
  }

  return users;
};

export const getCurrentUser = async (parent, args, context, info) => {
  // Get Access Token
  const accessToken = context.req.headers['authorization'];

  if (!accessToken)
    return new createError.Unauthorized('Access token was not found.');

  // Get the user ID
  const id = await verifyAccessToken(context.req, context.res, accessToken);

  const currentUser = await User.findById(id);

  const profile = await UserProfile.findById(currentUser.userprofile);

  return {
    id: currentUser.id,
    username: currentUser.username,
    password: currentUser.password,
    isAdmin: currentUser.isAdmin,
    lastTimeOnline: currentUser.lastTimeOnline,
    isOnline: currentUser.isOnline,
    userprofile: profile,
  };
};

export const getUserProfile = async (parent, args, context, info) => {
  const { id } = args;

  const profile: any = await UserProfile.findById(id);
  const currentUser = await User.findById(profile.user);

  return {
    id: profile.id,
    description: profile.description,
    color: profile.color,
    favoriteAnime: profile.favoriteAnime,
    favoriteManga: profile.favoriteManga,
    favoriteChar: profile.favoriteChar,
    user: currentUser,
  };
};

export const getCurrentUserProfile = async (parent, args, context, info) => {
  // Get Access Token
  const accessToken = context.req.headers['authorization'];

  if (!accessToken)
    return new createError.Unauthorized('Access token was not found.');

  // Get the user ID
  const id = await verifyAccessToken(context.req, context.res, accessToken);

  const currentUser = await User.findById(id);

  const userProfile: any = await UserProfile.findById(currentUser.userprofile);

  return {
    id: userProfile.id,
    description: userProfile.description,
    color: userProfile.color,
    favoriteAnime: userProfile.favoriteAnime,
    favoriteManga: userProfile.favoriteManga,
    favoriteChar: userProfile.favoriteChar,

    user: currentUser,
  };
};

export const getUserProfiles = async (parent, args, context, info) => {
  const profileRecords = await UserProfile.find();
  let userprofiles = [];

  for (let i = 0; i < profileRecords.length; i++) {
    const currentProfile: any = await UserProfile.findById(
      profileRecords[i].id
    );
    const user = await User.findById(currentProfile.user);

    const profile = {
      id: currentProfile.id,
      user: user,
      description: currentProfile.description,
      color: currentProfile.color,
      favoriteAnime: currentProfile.favoriteAnime,
      favoriteManga: currentProfile.favoriteManga,
      favoriteChar: currentProfile.favoriteChar,
    };

    userprofiles.push(profile);
  }

  return userprofiles;
};

// LIST

export const getList = async (parent, args, context, info) => {
  const { id } = args;

  const currentUser = await User.findById(id);
  const list = await List.findById(currentUser.list);

  return {
    id: list.id,
    finishedAnimes: list.finishedAnimes,
    watchingAnimes: list.watchingAnimes,
    watchlistAnimes: list.watchlistAnimes,

    finishedMangas: list.finishedMangas,
    watchingMangas: list.watchingMangas,
    watchlistMangas: list.watchlistMangas,

    user: currentUser,
  };
};

export const getLists = async (parent, args, context, info) => {
  const listRecords = await List.find();
  let lists = [];

  for (let i = 0; i < listRecords.length; i++) {
    const currentList = await List.findById(listRecords[i].id);
    const user = await User.findById(currentList.user);

    const list = {
      id: currentList.id,
      finishedAnimes: currentList.finishedAnimes,
      watchingAnimes: currentList.watchingAnimes,
      watchlistAnimes: currentList.watchlistAnimes,

      finishedMangas: currentList.finishedMangas,
      watchingMangas: currentList.watchingMangas,
      watchlistMangas: currentList.watchlistMangas,

      user: user,
    };

    lists.push(list);
  }

  return lists;
};

export const getCurrentList = async (parent, args, context, info) => {
  // Get Access Token
  const accessToken = context.req.headers['authorization'];

  if (!accessToken)
    return new createError.Unauthorized('Access token was not found.');

  // Get the user ID
  const userId = await verifyAccessToken(context.req, context.res, accessToken);

  const currentUser = await User.findById(userId);

  const list: any = await List.findById(currentUser.list);

  return {
    id: list.id,
    finishedAnimes: list.finishedAnimes,
    watchingAnimes: list.watchingAnimes,
    watchlistAnimes: list.watchlistAnimes,

    finishedMangas: list.finishedMangas,
    watchingMangas: list.watchingMangas,
    watchlistMangas: list.watchlistMangas,

    user: currentUser,
  };
};

// export const getFriendRequests = async (parent, args, context, info) => {
//   try {
//     // Get Access Token
//     const accessToken = context.req.headers['authorization'];

//     if (!accessToken)
//       return new createError.Unauthorized('Access token was not found.');

//     // Get the user ID
//     const userId = await verifyAccessToken(
//       context.req,
//       context.res,
//       accessToken
//     );

//     const user = await User.findById(userId);

//     let requestingUsers = [];

//     if (user.friendrequest !== null) {
//       const friendRequests = await FriendRequest.findById(user.friendrequest);

//       for (let i = 0; i < friendRequests.incomingUserId.length; i++) {
//         let currentItem = friendRequests.incomingUserId[i];
//         let currentRequest = await User.findById(currentItem);

//         let requestId = currentRequest.id;

//         let requestUsername = currentRequest.username;

//         requestingUsers.push({
//           incomingUserId: requestId,
//           incomingUser: requestUsername,
//         });
//       }

//       return requestingUsers;
//     }
//     return null;
//   } catch (error) {
//     console.log(error);
//   }
// };

// Query Friends
export const getFriendList = async (parent, args, context, info) => {
  try {
    // Get Access Token
    const accessToken = context.req.headers['authorization'];

    if (!accessToken)
      return new createError.Unauthorized('Access token was not found.');

    // Get the user ID
    const userId = await verifyAccessToken(
      context.req,
      context.res,
      accessToken
    );

    const user = await User.findById(userId);

    let friendlistArray: object[] = [];

    if (user.friendlist !== null) {
      const friendlist = await FriendList.findById(user.friendlist);

      for (let i = 0; i < friendlist.friends.length; i++) {
        let currentFriendId = friendlist.friends[i];

        let currentFriend = await User.findById(currentFriendId);

        const userprofile = await UserProfile.findById(
          currentFriend.userprofile
        );

        let friendData = {
          id: currentFriend.id,
          username: currentFriend.username,
          userprofile: userprofile,
        };

        if (!friendlistArray.includes(friendData)) {
          friendlistArray.push(friendData);
        }
      }
      return friendlistArray;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};
