import createHttpError from 'http-errors';
import { FriendRequest, User } from '../../models/User';
import { verifyAccessToken } from '../../services/auth';

export const getFriendRequests = async (parent, args, context, info) => {
  try {
    // Get Access Token
    const accessToken = context.req.headers['authorization'];

    if (!accessToken)
      return new createHttpError.Unauthorized('Access token was not found.');

    // Get the user ID
    const userId = await verifyAccessToken(
      context.req,
      context.res,
      accessToken
    );

    const user = await User.findById(userId);

    let requestingUsers = [];

    if (user.friendrequest !== null) {
      const friendRequests = await FriendRequest.findById(user.friendrequest);

      for (let i = 0; i < friendRequests.incomingUserId.length; i++) {
        let currentItem = friendRequests.incomingUserId[i];
        let currentRequest = await User.findById(currentItem);

        let requestId = currentRequest.id;

        let requestUsername = currentRequest.username;

        requestingUsers.push({
          incomingUserId: requestId,
          incomingUser: requestUsername,
        });
      }
      return requestingUsers;
    }
  } catch (error) {
    console.log(error);
  }
};
