import * as dotenv from 'dotenv';

dotenv.config();

const appConfig = {
  jwt: {
    secret: process.env.JWT_SECRET,
    authSecret: process.env.JWT_AUTH_SECRET,
    signOptions: {
      expiresIn: process.env.JWT_EXPIRE,
      algorithm: 'HS256'
    },
    authSignOptions: {
      expiresIn: process.env.JWT_AUTH_SECRET_EXPIRE,
      algorithm: 'HS256'
    },
    refreshTokenSignOptions: {
      algorithm: 'HS256',
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRE
    }
  }
};

export default appConfig;
