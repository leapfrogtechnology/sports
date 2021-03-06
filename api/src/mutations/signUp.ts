import { en } from '../lang/en';
import Context from '../models/Context';
import * as userService from '../services/user';
import MissingUserNameOrPasswordError from '../error/MissingUserNameOrPasswordError';

/**
 * Mutation for a user to sign up.
 *
 * @param {Object} parent
 * @param {Object} mutationParams
 * @param {Context} context
 * @returns {Object}
 * @throws {ApolloError}
 */
export const signUp = async (
  parent: any,
  { password, email }: { password: string; email: string },
  context: Context
) => {
  if (!email || !password) {
    throw new MissingUserNameOrPasswordError(en.MISSING_USERNAME_OR_PASSWORD);
  }

  await userService.createUser(password, email);

  return { message: en.SUCCESS };
};
