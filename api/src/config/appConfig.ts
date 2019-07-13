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
    verifyOptions: {
      algorithms: ['HS256'],
      maxAge: process.env.JWT_EXPIRE || '12h'
    }
  },
  apiEndPoints: { employees: process.env.LMS_CORE + '/users?size=1000' },
  apiKeys: {
    core: process.env.EMS_API_KEY
  }
};

export default appConfig;
