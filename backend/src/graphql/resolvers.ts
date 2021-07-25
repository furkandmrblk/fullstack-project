import { authMutations } from './auth';
import { userMutations, userQueries, userSubscriptions } from './user';
import { newsMutations, newsQueries } from './news';

export const resolvers = {
  Query: {
    ...userQueries,
    ...newsQueries,
  },

  Mutation: {
    ...authMutations,
    ...userMutations,
    ...newsMutations,
  },

  Subscription: {
    ...userSubscriptions,
  },
};
