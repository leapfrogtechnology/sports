import { GAMES } from '../constants/queries';
import * as httpHelper from '../utils/httpHelper';
import GameInterface from '../domains/models/Game';

/**
 * Fetch the list of all games.
 *
 * @export
 * @returns {Promise<any>}
 */
export async function fetchAll(): Promise<any> {
  const queryAPI = GAMES.ALL;

  const query = `
    query {
      ${queryAPI} {
        id,
        name,
        shortName
      }
    }
  `;

  return httpHelper.getResponse(queryAPI, query);
}

/**
 * Create a new game.
 *
 * @export
 * @param {GameInterface} payload
 * @returns {Promise<any>}
 */
export async function create(payload: GameInterface): Promise<any> {
  const queryAPI = GAMES.CREATE;

  const mutation = `
    mutation {
      ${queryAPI} (name: "${payload.name}", shortName: "${payload.shortName}") {
        id,
        name,
        shortName
      }
    }
  `;

  return httpHelper.getResponse(queryAPI, mutation);
}

/**
 * Edit an existing game.
 *
 * @export
 * @param {GameInterface} payload
 * @returns {Promise<any>}
 */
export async function edit(payload: GameInterface): Promise<any> {
  const queryAPI = GAMES.EDIT;

  const mutation = `
    mutation {
      ${queryAPI} (id: ${payload.id}, name: "${payload.name}", shortName: "${payload.shortName}") {
        id,
        name,
        shortName
      }
    }
  `;

  return httpHelper.getResponse(queryAPI, mutation);
}

/**
 * Delete an existing game.
 *
 * @export
 * @param {{ id: number }} payload
 * @returns {Promise<any>}
 */
export async function remove(payload: { id: number }): Promise<any> {
  const queryAPI = GAMES.DELETE;

  const mutation = `
    mutation {
      ${queryAPI} (id: ${payload.id}) {
        message
      }
    }
  `;

  return httpHelper.getResponse(queryAPI, mutation);
}
