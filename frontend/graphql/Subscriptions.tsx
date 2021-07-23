import { gql } from '@apollo/client';

export const getFriendRequestsS = gql`
  subscription getFriendRequests {
    getFriendRequests {
      incomingUser
      incomingUserId
    }
  }
`;
