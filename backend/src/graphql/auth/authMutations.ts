import {
  loginValidation,
  registerValidation,
} from '../../api/middlewares/validation';
import { User, UserProfile } from '../../models/User';
import createError from 'http-errors';
import bcrypt from 'bcrypt';
import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
  verifyRefreshToken,
  blacklistRefreshToken,
  verifyAccessToken,
} from '../../services/auth';

export const createUser = async (parent, args, context, info) => {
  try {
    const { username, password } = await registerValidation.validateAsync(
      args.user
    );

    const usernameExists = await User.findOne({
      username: username,
    });

    if (usernameExists)
      return new createError.Conflict(`'${username}' is already in use.`);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username: username,
      password: hashedPassword,
      userprofile: null,
      list: null,
    });

    await user.save();

    return user;
  } catch (error) {
    if (error.isJoi === true) throw new createError.BadRequest();
  }
};

export const loginUser = async (parent, args, context, info) => {
  try {
    // Joi Validation for the Login
    const { username, password } = await loginValidation.validateAsync(
      args.user
    );

    // Check if the Username exists
    const user = await User.findOne({ username: username });

    if (!user) return new createError.NotFound('User is not registered.');

    const userId = user.id;

    // Check if password is valid
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword)
      return new createError.Unauthorized('Incorrect username or password.');

    // Create Access- & Refreshtoken for the User

    const accessToken = await createAccessToken(userId);
    const refreshToken = await createRefreshToken(userId);

    sendRefreshToken(context.req, context.res, refreshToken);

    return { accessToken: accessToken };
  } catch (error) {
    if (error.isJoi === true)
      throw new createError.BadRequest('Invalid username or password');
    return false;
  }
};

export const logoutUser = async (parent, args, context, info) => {
  try {
    // Get Refresh Token
    const tokens = context.req.headers.cookie.split(' ');
    const x = tokens[0];
    const y = x.split('=');
    const refToken = y[1].split(';');
    const refreshToken = 'Bearer ' + refToken[0];

    if (!refreshToken)
      return new createError.BadRequest('Refresh Token was not found.');

    // Verify Refresh Token
    await verifyRefreshToken(context.req, context.res, refreshToken);

    // Blacklist the Refresh Token in our Redis Cache
    await blacklistRefreshToken(context.req, context.res, refreshToken);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const updateTokens = async (parent, args, context, info) => {
  // If the Access Token is not valid anymore generate a new pair of Access- & Refresh Tokens
  try {
    if (!context.req.headers.cookie)
      return new createError.Unauthorized('Cookie was not found.');

    // Get Refresh Token
    const token = await context.req.headers.cookie;
    const x = token.split('=');
    const refreshToken = 'Bearer ' + x[1];

    if (!refreshToken)
      throw new createError.BadRequest('Refresh Token was not found.');

    // Verify Refresh Token
    const userId = await verifyRefreshToken(
      context.req,
      context.res,
      refreshToken
    );

    // Create new pair of Tokens
    const accessToken = await createAccessToken(userId);
    const refToken = await createRefreshToken(userId);

    sendRefreshToken(context.req, context.res, refToken);

    return { accessToken: accessToken };
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (parent, args, context, info) => {
  if (!context.req.headers.cookie)
    return new createError.Unauthorized('Cookie was not found.');

  // Get Refresh Token
  const token = await context.req.headers.cookie;
  const x = token.split('=');
  const refreshToken = 'Bearer ' + x[1];

  if (!refreshToken)
    throw new createError.BadRequest('Refreshtoken was not found.');

  // Verify Refresh Token
  const userId = await verifyRefreshToken(
    context.req,
    context.res,
    refreshToken
  );

  // Get the current user with the id
  const user = await User.findById(userId);

  // Args
  const password: string = args.password;

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword)
    return new createError.Unauthorized('Incorrect password.');

  // Deleting the userprofile of the current user
  await UserProfile.findByIdAndDelete(user.userprofile);

  // Deleting the users account
  await User.findByIdAndDelete(userId);

  // Blacklist the Refresh Token in our Redis Cache
  await blacklistRefreshToken(context.req, context.res, refreshToken);

  return 'Successfully deleted user.';
};

export const changePassword = async (parent, args, context, info) => {
  try {
    // Get Access Token
    const accessToken = context.req.headers['authorization'];

    if (!accessToken)
      throw new createError.BadRequest('Access Token was not found.');

    // Verify Access Token
    const userId = await verifyAccessToken(
      context.req,
      context.res,
      accessToken
    );

    const user = await User.findById(userId);

    const { password, oldPassword } = args;

    // Check if password is valid
    const validPassword = await bcrypt.compare(oldPassword, user.password);

    if (!validPassword)
      return new createError.Unauthorized('Incorrect password.');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const updates: any = {};

    if (password !== undefined) {
      updates.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    });

    return updatedUser;
  } catch (error) {
    console.log(error);
    
  }
}