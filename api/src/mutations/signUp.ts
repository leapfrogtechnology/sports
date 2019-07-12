import HttpStatus from 'http-status-codes';

import { en } from '../lang/en';
import Context from '../models/Context';
import { buildError } from '../utils/errors';
import * as userService from '../service/user';
import MissingUserNameOrPasswordError from '../error/MissingUserNameOrPasswordError';

/**
 * Mutation for user to signUP.
 *
 * @param {Object} parent
 * @param {Object} mutationParams
 * @param {Context} context
 * @returns {Object}
 * @throws {MissingUserNameOrPasswordError}
 */
export const signUp = async (
  parent: any,
  { password, email }: { password: string; email: string },
  context: Context
) => {
  try {
    if (!email || !password) {
      throw new MissingUserNameOrPasswordError(en.MISSING_USERNAME_OR_PASSWORD);
    }

    await userService.createUser(password, email);

    return { message: en.SUCCESS, code: HttpStatus.CREATED };
  } catch (err) {
    return buildError(err);
  }
};
