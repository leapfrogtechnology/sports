import * as dotenv from 'dotenv';

dotenv.config();

const appConfig = {
  jwt: {
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: process.env.JWT_EXPIRE || '12h',
      algorithm: 'HS256'
    },
    refreshTokenSignOptions: {
      algorithm: 'HS256',
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRE
    },
    verifyAccessTokenOptions: {
      algorithms: ['HS256'],
      maxAge: process.env.JWT_EXPIRE || '12h'
    },
    verifyRefreshTokenOptions: {
      algorithms: ['HS256'],
      maxAge: process.env.JWT_REFRESH_TOKEN_EXPIRE || '12h'
    }
  },
  ems: {
    apiURL: process.env.EMS_API_URL,
    apiKey: process.env.EMS_API_KEY
  }
};

export default appConfig;
