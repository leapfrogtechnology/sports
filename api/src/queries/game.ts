import Context from '../models/Context';
import * as gameServices from '../services/game';
import { validateContext } from '../utils/validations';

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
  validateContext(context);

  const allGames = await gameServices.fetchAll();

  return allGames;
}
