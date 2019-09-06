import { ROUNDS } from '../constants/queries';
import { IdInterface } from '../domains/General';
import * as httpHelper from '../utils/httpHelper';
import RoundInterface from '../domains/models/Round';

/**
 * Fetch the list of all rounds.
 *
 * @export
 * @returns {Promise<any>}
 */
export async function fetchAll(): Promise<any> {
  const queryAPI = ROUNDS.ALL;

  const query = `
    query {
      ${queryAPI} {
        id,
        name,
        shortName,
        sortOrder
      }
    }
  `;

  return await httpHelper.getResponse(queryAPI, query);
}

/**
 * Create a new round.
 *
 * @export
 * @param {RoundInterface} payload
 * @returns {Promise<any>}
 */
export async function create(payload: RoundInterface): Promise<any> {
  const queryAPI = ROUNDS.CREATE;

  const mutation = `
    mutation {
      ${queryAPI} (name: "${payload.name}", shortName: "${payload.shortName}", sortOrder: ${payload.sortOrder}) {
        id,
        name,
        shortName,
        sortOrder
      }
    }
  `;

  return await httpHelper.getResponse(queryAPI, mutation);
}

/**
 * Edit an existing round.
 *
 * @export
 * @param {RoundInterface} payload
 * @returns {Promise<any>}
 */
export async function edit(payload: RoundInterface): Promise<any> {
  const queryAPI = ROUNDS.EDIT;

  const mutation = `
    mutation {
      ${queryAPI} (
        id: ${payload.id},
        name: "${payload.name}",
        shortName: "${payload.shortName}",
        sortOrder: ${payload.sortOrder}
      ) {
        id,
        name,
        shortName,
        sortOrder
      }
    }
  `;

  return await httpHelper.getResponse(queryAPI, mutation);
}

/**
 * Delete an existing round.
 *
 * @export
 * @param {IdInterface} payload
 * @returns {Promise<any>}
 */
export async function remove(payload: IdInterface): Promise<any> {
  const queryAPI = ROUNDS.DELETE;

  const mutation = `
    mutation {
      ${queryAPI} (id: ${payload.id}) {
        message
      }
    }
  `;

  return await httpHelper.getResponse(queryAPI, mutation);
}
