import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from '../interfaces/IUser';
import { IUserProfile } from '../interfaces/IUserProfile';
import { IList } from '../interfaces/IList';
import { IFriendList } from '../interfaces/IFriendList';
import { IFriendRequest } from '../interfaces/IFriendRequest';

// This is our User Schema for our MongoDB Database

const userSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    min: 3,
    max: 30,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  isAdmin: {
    type: Boolean,
  },
  userprofile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserProfile',
  },
  list: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List',
  },
  friendlist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FriendList',
  },
  friendrequest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FriendRequest',
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

const userProfileSchema: Schema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  description: {
    type: String,
    required: true,
    max: 155,
  },
  color: {
    type: String,
    required: true,
  },
  favoriteAnime: {
    type: String,
  },
  favoriteManga: {
    type: String,
  },
  favoriteChar: {
    type: String,
  },
});

const listSchema: Schema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  finishedAnimes: [String],
  watchingAnimes: [String],
  watchlistAnimes: [String],

  finishedMangas: [String],
  watchingMangas: [String],
  watchlistMangas: [String],
});

const friendlistSchema: Schema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  friends: [String],
});

const friendRequestSchema: Schema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  incomingUserId: [String],
});

let FriendRequest = mongoose.model<IFriendRequest>(
  'FriendRequest',
  friendRequestSchema
);
let FriendList = mongoose.model<IFriendList>('FriendList', friendlistSchema);
let UserProfile = mongoose.model<IUserProfile>(
  'UserProfile',
  userProfileSchema
);
let List = mongoose.model<IList>('List', listSchema);
let User = mongoose.model<IUser>('User', userSchema);

export { User, UserProfile, List, FriendList, FriendRequest };
