import jwt from 'jsonwebtoken';
import HttpStatus from 'http-status-codes';

import { en } from '../lang/en';
import JWTError from '../error/JWTError';
import appConfig from '../config/appConfig';
import JWTExpiredError from '../error/JWTExpiredError';
import { AccessTokenData, RefreshTokenData } from '../domains/token';

const TOKEN_EXPIRED_ERROR = 'TokenExpiredError';

/**
 * Create token.
 *
 * @param {Object} data - Data to be tokenized.
 * @returns {String}
 * @throws {JWTError}
 */
export function createToken(data: AccessTokenData) {
  try {
    const token = jwt.sign(data, appConfig.jwt.secret || '', appConfig.jwt.signOptions);

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
 * @throws {JWTError}
 */
export function createRefreshToken(data: RefreshTokenData) {
  try {
    const token = jwt.sign(data, appConfig.jwt.secret || '', appConfig.jwt.refreshTokenSignOptions);

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
 * @throws {JWTError|JWTExpiredError}
 */
export function verify(token: string) {
  try {
    jwt.verify(token, appConfig.jwt.secret || '', appConfig.jwt.verifyOptions);
  } catch (err) {
    if (err.name === TOKEN_EXPIRED_ERROR) {
      throw new JWTExpiredError(en.TOKEN_EXPIRED, err, HttpStatus.UNAUTHORIZED);
    }
    throw new JWTError(en.INVALID_TOKEN, err);
  }
}
