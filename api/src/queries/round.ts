import HttpStatus from 'http-status-codes';
import { ApolloError } from 'apollo-server-core';

import Round from '../domains/round';
import Context from '../models/Context';
import * as roundServices from '../services/round';

/**
 * Query for fetching the list of all rounds.
 *
 * @export
 * @param {*} parent
 * @param {Round} payload
 * @param {Context} context
 * @returns {Promise<object>}
 */
export async function rounds(parent: any, payload: Round, context: Context): Promise<object> {
  if (context.error) {
    throw new ApolloError(context.error, HttpStatus.FORBIDDEN.toString());
  }

  const allRounds = await roundServices.fetchAll();

  return allRounds;
}
