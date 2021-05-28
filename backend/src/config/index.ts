import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  // Server Port
  port: process.env.PORT,

  // Database Environment Variables
  dbUrl: process.env.DB_URI,
  dbName: process.env.DB_NAME,

  // Token Secrets - your secret sauce
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,

  // Redis Cache Environment Variables

  redisPort: process.env.REDIS_PORT,
  redisHost: process.env.REDIS_HOST,
};
