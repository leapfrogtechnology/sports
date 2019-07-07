import HttpStatus from 'http-status-codes';

import { buildError } from '../utils/errors';
import Context from '../models/Context';

import * as userService from '../service/user';

export const refreshAccessToken = async (parent: any, args: any, context: Context, info: any) => {
  try {
    const { accessToken, message } = await userService.getNewAccessToken(args.refreshToken);

    return { accessToken, message, code: HttpStatus.OK };
  } catch (err) {
    return buildError(err);
  }
};
