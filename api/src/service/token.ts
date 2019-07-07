import * as jwt from '../utils/jwt';

import UserAccountTokens from '../models/UserAccountTokens';

/**
 * Generates access token and refresh token.
 * Insert refresh token into the database.
 *
 * @param {Object} data
 * @returns {Object}
 */
export async function generateAccessAndRefreshTokens(data: any) {
  const refreshTokenData = { data, isRefreshToken: true };
  const accessTokenData = { data };

  const accessToken = jwt.createToken(accessTokenData);
  const refreshToken = jwt.createRefreshToken(refreshTokenData);

  await new UserAccountTokens({
    user_account_id: data.user.id,
    refresh_token: refreshToken,
    created_at: new Date(Date.now())
  }).save();

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
 * @param {Object} data.
 * @returns {String}
 */
export function generateAccessToken(data: any) {
  const accessToken = jwt.createToken({ data });

  return accessToken;
}
