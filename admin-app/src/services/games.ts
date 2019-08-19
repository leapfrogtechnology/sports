import * as httpHelper from '../utils/httpHelper';

/**
 * Fetch the list of all games.
 *
 * @export
 * @returns
 */
export async function fetchAllGames() {
  const queryAPI = `games`;

  const query = `
    query {
      ${queryAPI} {
        id,
        name,
        shortName
      }
    }
  `;

  return await httpHelper.getResponse(queryAPI, query);
}
