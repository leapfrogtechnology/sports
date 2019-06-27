import appConfig from '../config/appConfig';
import * as jwt from '../utils/jwt';

/**
 * Generates access token and refresh token.
 * Insert refresh token into the database.
 *
 * @param {Object} data
 * @returns {String}
 */
export async function generateAccessAndRefreshTokens(data: any) {
  const refreshTokenData = { data, isRefreshToken: true };
  const accessTokenData = { data };

  const accessToken = jwt.createToken(accessTokenData);
  const refreshToken = jwt.createRefreshToken(refreshTokenData);

  // await refreshTokens.insert(
  //   data.id,
  //   refreshToken,
  //   new Date(Date.now() + parseInt(appConfig.jwt.refreshTokenSignOptions.expiresIn))
  // );
  // save to db
  return {
    accessToken,
    refreshToken,
    data
  };
}

/**
 * Generate access token.
 *
 * @param {Object} data - Client key sent by LMS.
 * @returns {String}
 */
export function generateAccessToken(data: any) {
  const accessToken = jwt.createToken({ data });

  return accessToken;
}
