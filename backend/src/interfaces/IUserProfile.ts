import { Document } from 'mongoose';

export interface IUserProfile extends Document {
  user: Object;
  description: string;
  color: string;
  favoriteAnime: string;
  favoriteManga: string;
  favoriteChar: string;
}
