import Context from '../models/Context';
import * as gameServices from '../services/game';

/**
 * Query for fetching the list of all games.
 *
 * @export
 * @param {*} parent
 * @param {{ name: string; shortName: string }} { name, shortName }
 * @param {Context} context
 * @returns
 */
export async function allGames(
  parent: any,
  { name, shortName }: { name: string; shortName: string },
  context: Context
) {
  const games = await gameServices.fetchAllGames();

  return games;
}
