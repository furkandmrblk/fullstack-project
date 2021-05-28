import { authMutations } from './auth';
import { userMutations, userQueries } from './user';

export const resolvers = {
  Query: {
    ...userQueries,
  },

  Mutation: {
    ...authMutations,
    ...userMutations,
  },
};
