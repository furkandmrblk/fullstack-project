import { Request, Response, NextFunction, CookieOptions } from 'express';
import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import config from '../config';

import { client } from '../loaders/redis';

// create AccessToken
export function createAccessToken(userId: string) {
  return new Promise<string>((resolve, reject) => {
    const payload = {};
    const secret = config.accessTokenSecret;
    const options = {
      expiresIn: '20m',
      audience: userId,
    };

    // Assign Access Token to User
    jwt.sign(
      payload,
      secret,
      options,
      (err: { message: string }, token: string) => {
        if (err) {
          console.log(err.message);
          reject(new createError.InternalServerError());
          return;
        }
        resolve(token);
      }
    );
  });
}

// create RefreshToken
export function createRefreshToken(userId: string) {
  return new Promise<string>((resolve, reject) => {
    const payload = {};
    const secret = config.refreshTokenSecret;
    const options = {
      expiresIn: '1y',
      //   issuer: 'http://localhost:3000'
      audience: userId,
    };

    // Assign the refreshtoken to the user
    jwt.sign(
      payload,
      secret,
      options,
      (err: { message: string }, token: string) => {
        if (err) {
          console.log(err.message);
          reject(new createError.InternalServerError());
          return;
        }

        // Set the refreshtoken for the Redis-Client
        client.SET(
          userId,
          token,
          'EX',
          365 * 24 * 60 * 60,
          (err: { message: string }) => {
            if (err) {
              console.log(err.message);
              reject(new createError.InternalServerError());
              return;
            }
          }
        );
        resolve(token);
      }
    );
  });
}

// verify AccessToken
export function verifyAccessToken(req: any, res: Response, next: NextFunction) {
  return new Promise<string>((resolve, reject) => {
    // We're checking if the header contains the accesstoken in the authorization header
    if (!req.headers['authorization']) return new createError.Unauthorized();

    // Now we need to split the Bearer Token to get the accesstoken
    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];

    // Now that we got the accesstoken let's verify the jwt token
    jwt.verify(
      token,
      config.accessTokenSecret,
      (err: { name: string; message: string }, payload: any) => {
        if (err) {
          // Here we are checking if the error comes from jsonwebtoken. If so then we don't want to display the error message.
          const message =
            err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
          return reject(new createError.Unauthorized(message));
        }
        req.payload = payload;

        return resolve(payload.aud);
      }
    );
  });
}

// verify RefreshToken
export function verifyRefreshToken(
  req: Request,
  res: Response,
  refreshToken: string
) {
  return new Promise<string>((resolve, reject) => {
    if (!req.headers['authorization']) {
      return new createError.Unauthorized('Invalid Refresh Token');
    }

    const bearerToken = refreshToken.split(' ');
    const reftoken = bearerToken[1];

    jwt.verify(
      reftoken,
      config.refreshTokenSecret,
      (err: { name: string; message: string }, payload: any) => {
        if (err) {
          const message =
            err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
          return reject(new createError.Unauthorized('Invalid Refresh Token'));
        }
        const userId = payload.aud;

        // Get the refreshtoken from the Redis-Client
        client.GET(userId, (err: { message: string }, result) => {
          if (err) {
            console.log(err.message);
            new createError.InternalServerError();
            return;
          }
          if (reftoken === result) return resolve(userId);

          reject(new createError.Unauthorized());
        });
      }
    );
  });
}

// Blacklist Refresh Token
export function blacklistRefreshToken(
  req: Request,
  res: Response,
  refreshToken: string
) {
  return new Promise<string>((resolve, reject) => {
    if (!req.headers['authorization']) {
      return new createError.Unauthorized('Invalid Refresh Token');
    }

    const bearerToken = refreshToken.split(' ');
    const reftoken = bearerToken[1];

    jwt.verify(
      reftoken,
      config.refreshTokenSecret,
      (err: { name: string; message: string }, payload: any) => {
        if (err) {
          const message =
            err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
          return reject(new createError.Unauthorized('Invalid Refresh Token'));
        }
        const userId = payload.aud;

        // Get the Refresh Token from the Redis-Client
        client.GET(userId, (err: { message: string }, result) => {
          if (err) {
            console.log(err.message);
            new createError.InternalServerError();
            return;
          }
          if (reftoken !== result)
            return reject(new createError.Unauthorized());

          // Blacklist the Refresh Token
          client.DEL(userId, (err: { message: String }, value: Number) => {
            if (err) {
              console.log(err.message);
              throw new createError.InternalServerError(
                'Could not blacklist Refresh Token.'
              );
            }
            return resolve('Token blacklisted.');
          });
        });
      }
    );
  });
}

// Send Refresh Token
export function sendRefreshToken(req: Request, res: Response, token: string) {
  const options: CookieOptions = {
    httpOnly: true,
    path: '/',
    expires: new Date(Date.now() * 365 * 24 * 60 * 60),
  };

  res.cookie('refreshToken', token, options);
}
