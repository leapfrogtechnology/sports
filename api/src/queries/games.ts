import HttpStatus from 'http-status-codes';
import { ApolloError } from 'apollo-server-core';

import Context from '../models/Context';
import * as gameServices from '../services/game';

/**
 * Query for fetching the list of all games.
 *
 * @export
 * @param {*} parent
 * @param {{ name: string; shortName: string }} { name, shortName }
 * @param {Context} context
 * @returns {object}
 * @throws ApolloError
 */
export async function games(parent: any, { name, shortName }: { name: string; shortName: string }, context: Context) {
  if (context.error) {
    throw new ApolloError(context.error, HttpStatus.FORBIDDEN.toString());
  }

  const allGames = await gameServices.fetchAllGames();

  return allGames;
}
