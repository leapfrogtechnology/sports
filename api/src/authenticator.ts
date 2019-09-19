import { Request } from 'express';

import { en } from './lang/en';
import TokenError from './error/TokenError';

/**
 * Get token from header in request.
 *
 * @param {Request} req
 */
export function getTokenFromHeaders(req: Request) {
  const {
    headers: { authorization }
  } = req;

  if (authorization && authorization.split(' ')[0] === 'Bearer' && authorization.split(' ')[1] !== undefined) {
    return { token: authorization.split(' ')[1] };
  }

  return { error: new TokenError(en.EMPTY_TOKEN) };
}
