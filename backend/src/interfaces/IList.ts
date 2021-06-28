import { Document } from 'mongoose';

export interface IList extends Document {
  user: Object;
  finishedAnimes: [string];
  watchingAnimes: [string];
  watchlistAnimes: [string];

  finishedMangas: [string];
  watchingMangas: [string];
  watchlistMangas: [string];
}
