import { Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  userprofile: Object;
  list: Object;
  friendlist: Object;
  friendrequest: Object;
  isAdmin: boolean;
}
