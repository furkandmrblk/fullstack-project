import { Document } from 'mongoose';
import { IUser } from './IUser';

export interface IFriendList extends Document {
  user: Object;
  friends: [Object];
}
