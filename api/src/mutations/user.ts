import * as HttpStatus from 'http-status-codes';
import { ApolloError } from 'apollo-server-core';

import Context from '../models/Context';
import * as userService from '../services/user';
import { UserInfoPayload } from '../domains/user';

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
  if (context.error) {
    throw new ApolloError(context.error, HttpStatus.FORBIDDEN.toString());
  }

  return userService.getUserInfo(payload.refreshToken);
}
