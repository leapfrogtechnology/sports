import HttpStatus from 'http-status-codes';

import { buildError } from '../utils/errors';
import Context from '../models/Context';

import * as userService from '../service/user';

export const signUp = async (
  parent: any,
  { password, email }: { password: string; email: string },
  context: Context
) => {
  try {
    await userService.createUser(password, email);

    return { message: 'success', code: HttpStatus.CREATED };
  } catch (err) {
    return buildError(err);
  }
};
