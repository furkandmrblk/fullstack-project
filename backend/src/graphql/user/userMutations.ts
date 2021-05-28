import createError from 'http-errors';
import { User, UserProfile } from '../../models/User';
import { verifyAccessToken } from '../../services/auth';

export const createProfile = async (parent, args, context, info) => {
  try {
    // Get Data
    const { description, color, favoriteAnime, favoriteManga, favoriteChar } =
      args.profile;

    // Get Access Token
    const accessToken = context.req.headers.authorization;

    if (!accessToken)
      throw new createError.BadRequest('Access Token was not found.');

    // Verify Access Token
    const userId = await verifyAccessToken(
      context.req,
      context.res,
      accessToken
    );

    if (!userId) return new createError.Unauthorized();

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
      userprofile.save();

      return userprofile;
    } else return new createError.BadRequest('Could not find user.');
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = async (parent, args, context, info) => {
  try {
    // Get Access Token
    const accessToken = context.req.headers.authorization;

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

    // Get the userprofile ID
    const { id } = args;

    // Check if userprofile id matches current users userprofile id
    if (currentUser.userprofile != id)
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
