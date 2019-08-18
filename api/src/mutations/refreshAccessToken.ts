import HttpStatus from 'http-status-codes';

import Context from '../models/Context';
import * as tokenService from '../services/token';

/**
 * Mutation to refresh access token.
 *
 * @param {Object} parent
 * @param {Object} mutationParams
 * @param {Context} context
 * @returns {Object}
 */
export const refreshAccessToken = async (parent: any, { refreshToken }: { refreshToken: string }, context: Context) => {
  const { accessToken, message } = await tokenService.getNewAccessToken(refreshToken);

  return { accessToken, message, code: HttpStatus.OK };
};
