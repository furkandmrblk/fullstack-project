import { Document } from 'mongoose';

export interface IFriendRequest extends Document {
  user: Object;
  incomingUserId: [string];
}
