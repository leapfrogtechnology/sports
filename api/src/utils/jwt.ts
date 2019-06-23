import * as jwt from 'jsonwebtoken';

import appConfig from '../config/appConfig';
import { en } from '../lang/en';
import JWTError from '../error/JWTError';
import JWTExpiredError from '../error/JWTExpiredError';

/**
 * Create token.
 *
 * @param {Object} data - Data to be tokenized.
 * @returns {String}
 */
export function createToken(data: any) {
  try {
    const token = jwt.sign(data, appConfig.jwt.secret, appConfig.jwt.signOptions);

    return token;
  } catch (err) {
    throw new JWTError(en.TOKEN_CREATION_ERROR, err);
  }
}

/**
 * Create token.
 *
 * @param {Object} data - Data to be tokenized.
 * @returns {String}
 */
export function createAuthorizationToken(data: any) {
  try {
    const token = jwt.sign(data, appConfig.jwt.authSecret, appConfig.jwt.authSignOptions);

    return token;
  } catch (err) {
    throw new JWTError(en.TOKEN_CREATION_ERROR, err);
  }
}

/**
 * Create refresh token.
 *
 * @param {Object} data - Data to be tokenized.
 * @returns {String}
 */
export function createRefreshToken(data: any) {
  try {
    const token = jwt.sign(data, appConfig.jwt.secret, appConfig.jwt.refreshTokenSignOptions);

    return token;
  } catch (err) {
    throw new JWTError(en.TOKEN_CREATION_ERROR, err);
  }
}

/**
 * Verify token.
 *
 * @param {Object} token - Token to be verified.
 * @returns {Object}
 */
export function verify(token: any) {
  try {
    const data = jwt.verify(token, appConfig.jwt.secret, appConfig.jwt.signOptions);

    return data;
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      throw new JWTExpiredError(en.TOKEN_EXPIRED, err);
    }
    throw new JWTError(en.INVALID_TOKEN, err);
  }
}
