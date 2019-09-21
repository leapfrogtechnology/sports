import { ApolloError } from 'apollo-server-core';

import Status from '../domains/status';
import Context from '../models/Context';
import * as statusServices from '../services/status';

/**
 * Query for fetching the list of all statuses.
 *
 * @export
 * @param {*} parent
 * @param {Status} payload
 * @param {Context} context
 * @returns {Promise<object>}
 */
export async function statuses(parent: any, payload: Status, context: Context): Promise<object> {
  if (context.error) {
    throw new ApolloError(context.error, context.error.extensions.code.toString());
  }

  return statusServices.fetchAll();
}
