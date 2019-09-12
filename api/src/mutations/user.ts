import Context from '../models/Context';
import * as userService from '../services/user';
import { UserInfoPayload } from '../domains/user';
import { validateContext } from '../utils/validations';

/**
 * Mutation to get user information.
 *
 * @export
 * @param {*} parent
 * @param {UserInfoPayload} payload
 * @param {Context} context
 * @returns {Promise<object>}
 */
export function userInfo(parent: any, payload: UserInfoPayload, context: Context): Promise<object> {
  validateContext(context);

  return userService.getUserInfo(payload.refreshToken);
}
