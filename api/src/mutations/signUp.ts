import HttpStatus from 'http-status-codes';

import { buildError } from '../utils/errors';
import Context from '../models/Context';

import * as userService from '../service/user';

export const signUp = async (parent: any, args: any, context: Context, info: any) => {
  try {
    await userService.createUser(args.password, args.email);

    return { message: 'success', code: HttpStatus.CREATED };
  } catch (err) {
    return buildError(err);
  }
};
