import { Document } from 'mongoose';

export interface INews extends Document {
  title: string;
  text: string;
  date: string;
}
