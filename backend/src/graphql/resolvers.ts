import { authMutations } from './auth';
import { userMutations, userQueries, userSubscriptions } from './user';
import { newsMutations, newsQueries } from './news';

export const roots: any = {
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
