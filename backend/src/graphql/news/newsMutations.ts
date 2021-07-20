import createHttpError from 'http-errors';
import { INews } from '../../interfaces/INews';
import News from '../../models/News';
import { User } from '../../models/User';
import { verifyAccessToken } from '../../services/auth';

export const createNews = async (parent, args, context, info) => {
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

    if (user.isAdmin === false)
      return new createHttpError.Unauthorized(
        'You do not have the permission to create a post!'
      );

    const { title, text } = args.news;

    const newsPost: INews = new News({
      title: title,
      text: text,
    });

    await newsPost.save();
  } catch (error) {
    console.log(error);
  }
};
