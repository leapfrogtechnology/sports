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
    core:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyOTMsImRhdGVvZkJpcnRoIjoiMTk5Ni0wNS0wN1QwMDowMDowMC4wMDBaIiwiYXZhdGFyVXJsIjoiaHR0cHM6Ly9sbXMubGZ0ZWNobm9sb2d5LmNvbS9pbWFnZXMvNDA0LnBuZz9iZDU5Y2JiOS1hNDYxLTRhY2ItOGJjNS01MTE4ODVjODE4M2MiLCJlbXBJZCI6IjQwNCIsImVtcFN0YXR1cyI6IlBlcm1hbmVudCIsImZpcnN0TmFtZSI6IlNocmVlaml0IiwibGFzdE5hbWUiOiJSYWpiYW5zaGkiLCJlbWFpbCI6InNocmVlaml0cmFqYmFuc2hpQGxmdGVjaG5vbG9neS5jb20iLCJnZW5kZXIiOiJNQUxFIiwiZ2l0aHViSWQiOiJodHRwczovL2dpdGh1Yi5jb20vU0VSUEFOVCIsImlzSG9kIjpmYWxzZSwiaXNIciI6ZmFsc2UsImlzUmFmZmxlRWxpZ2libGUiOnRydWUsImlzU3VwZXJ2aXNvciI6ZmFsc2UsIm1pZGRsZU5hbWUiOm51bGwsIm1vYmlsZVBob25lIjoiOTgxODkxMTM3MCIsInRlbXBvcmFyeUFkZHJlc3MiOm51bGwsImJsb29kR3JvdXAiOiJBKyIsImlzUHJvamVjdE1hbmFnZXIiOmZhbHNlLCJpc1RlYW1MZWFkIjpmYWxzZSwiaXNBY2NvdW50TWFuYWdlciI6ZmFsc2UsImlzQ29hY2giOmZhbHNlLCJpc1Blb3BsZU9wcyI6ZmFsc2UsImlzUHJveHlwbSI6ZmFsc2UsImlzUmVzb3VyY2VNYW5hZ2VyIjpmYWxzZSwiY29hY2hJZCI6bnVsbCwic3VwZXJ2aXNvcklkIjoxMzQsInBlcm1hbmVudEFkZHJlc3MiOiJCYXN1bmRoYXJhLCBLYXRobWFuZHUiLCJza3lwZUlkIjpudWxsLCJob21lUGhvbmUiOm51bGx9LCJpYXQiOjE1NjMwNjYwOTgsImV4cCI6MTU2MzA2OTY5OH0.EQoYDkVccu2L9xlSFuY8HY43_mkbIQO0ZRzJaiqNnkA'
  }
};

export default appConfig;
