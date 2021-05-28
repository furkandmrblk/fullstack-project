import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from '../interfaces/IUser';
import { IUserProfile } from '../interfaces/IUserProfile';

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
  // alphabet: {
  //   type: [String],
  //   enum: ['abc defg', 'jdff', '2323'],
  // },
});

let UserProfile = mongoose.model('UserProfile', userProfileSchema);
let User = mongoose.model<IUser>('User', userSchema);

export { User, UserProfile };
