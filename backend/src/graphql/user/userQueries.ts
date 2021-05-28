import { User } from '../../models/User';
import { UserProfile } from '../../models/User';
import createError from 'http-errors';
import { verifyAccessToken } from '../../services/auth';
import { IUserProfile } from '../../interfaces/IUserProfile';
import { IUser } from '../../interfaces/IUser';

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
      userprofile: profile,
    };

    users.push(user);
  }

  return users;
};

export const getUserProfile = async (parent, args, context, info) => {
  const { id } = args;

  const profile: any = await UserProfile.findById(id);
  const currentUser = await User.findById(profile.user);

  return {
    description: profile.description,
    color: profile.color,
    favoriteAnime: profile.favoriteAnime,
    favoriteManga: profile.favoriteManga,
    favoriteChar: profile.favoriteChar,
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

// Update Tokens richtig einsetzen [] (muss ich das beim Frontend einsetzen?)
// getUsers & getUserProfiles richtig fetchen [x]

// Später TO-DOS
// Socials reinbringen []
// Drop Downs reinbringen []
// Profile Picture reinbringen []

// Start with Frontend
//  -Design verbessern
//  -PC View hardcoden
//  -GraphQL mit einbringen
//  -Authentication
//  -UserProfiles
