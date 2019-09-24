import { Request } from 'express';
import HttpStatus from 'http-status-codes';

import { en } from './lang/en';
import TokenError from './error/TokenError';

/**
 * Get token from header in request object.
 *
 * @export
 * @param {Request} req
 * @returns {object}
 */
export function getTokenFromHeaders(req: Request): object {
  const {
    headers: { authorization }
  } = req;

  if (authorization && authorization.split(' ')[0] === 'Bearer' && authorization.split(' ')[1] !== undefined) {
    return { token: authorization.split(' ')[1] };
  }

  return {
    error: {
      details: new TokenError(en.EMPTY_TOKEN),
      extensions: {
        code: HttpStatus.FORBIDDEN.toString()
      }
    }
  };
}
