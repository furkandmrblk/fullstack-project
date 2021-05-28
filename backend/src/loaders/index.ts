import expressApolloLoader from './express';
import mongooseLoader from './mongoose';
import './redis';

export default async () => {
  // Requiring all Loaders

  await expressApolloLoader();

  await mongooseLoader();
};
