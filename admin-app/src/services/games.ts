import * as httpHelper from '../utils/httpHelper';
import GameInterface from '@/domains/models/Game';

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

/**
 * Create a new game.
 *
 * @export
 * @param {{ name: string; shortName: string }} payload
 * @returns
 */
export async function createGame(payload: { name: string; shortName: string }) {
  const queryAPI = `createGame`;

  const mutation = `
    mutation {
      ${queryAPI} (name: "${payload.name}", shortName: "${payload.shortName}") {
        id,
        name,
        shortName
      }
    }
  `;

  return await httpHelper.getResponse(queryAPI, mutation);
}

/**
 * Edit an existing game.
 *
 * @export
 * @param {GameInterface} payload
 * @returns
 */
export async function editGame(payload: GameInterface) {
  const queryAPI = `editGame`;

  const mutation = `
    mutation {
      ${queryAPI} (id: ${payload.id}, name: "${payload.name}", shortName: "${payload.shortName}") {
        id,
        name,
        shortName
      }
    }
  `;

  return await httpHelper.getResponse(queryAPI, mutation);
}

/**
 * Delete an existing game.
 *
 * @export
 * @param {{ id: number }} payload
 * @returns
 */
export async function deleteGame(payload: { id: number }) {
  const queryAPI = `deleteGame`;

  const mutation = `
    mutation {
      ${queryAPI} (id: ${payload.id}) {
        message
      }
    }
  `;

  return await httpHelper.getResponse(queryAPI, mutation);
}
