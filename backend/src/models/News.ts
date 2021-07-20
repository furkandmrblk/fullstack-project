import mongoose, { Schema } from 'mongoose';
import { INews } from '../interfaces/INews';

const newsSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

let News = mongoose.model<INews>('News', newsSchema);

export default News;
