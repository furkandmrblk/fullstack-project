import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from '../interfaces/IUser';
import { IUserProfile } from '../interfaces/IUserProfile';
import { IList } from '../interfaces/IList';

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
  userprofile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserProfile',
  },
  list: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List',
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

const completeSchema: Schema = new Schema({
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
  finishedAnimes: [String],
  watchingAnimes: [String],
  watchlistAnimes: [String],

  finishedMangas: [String],
  watchingMangas: [String],
  watchlistMangas: [String],
});

let UserProfile = mongoose.model<IUserProfile>(
  'UserProfile',
  userProfileSchema
);
let List = mongoose.model<IList>('List', listSchema);
let CompleteData = mongoose.model('CompleteData', completeSchema);
let User = mongoose.model<IUser>('User', userSchema);

export { User, UserProfile, List, CompleteData };
