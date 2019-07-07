import HttpStatus from 'http-status-codes';

import Context from '../models/Context';
import { buildError } from '../utils/errors';
import * as tokenService from '../service/token';

export const refreshAccessToken = async (parent: any, { refreshToken }: { refreshToken: string }, context: Context) => {
  try {
    const { accessToken, message } = await tokenService.getNewAccessToken(refreshToken);

    return { accessToken, message, code: HttpStatus.OK };
  } catch (err) {
    return buildError(err);
  }
};
