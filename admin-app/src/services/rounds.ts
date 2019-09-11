import { ROUNDS } from '../constants/queries';
import { IDInterface } from '../domains/General';
import * as httpHelper from '../utils/httpHelper';
import RoundInterface from '../domains/models/Round';

/**
 * Fetch the list of all rounds.
 *
 * @export
 * @returns {Promise<any>}
 */
export function fetchAll(): Promise<any> {
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

  return httpHelper.getResponse(queryAPI, query);
}

/**
 * Create a new round.
 *
 * @export
 * @param {RoundInterface} payload
 * @returns {Promise<any>}
 */
export function create(payload: RoundInterface): Promise<any> {
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

  return httpHelper.getResponse(queryAPI, mutation);
}

/**
 * Edit an existing round.
 *
 * @export
 * @param {RoundInterface} payload
 * @returns {Promise<any>}
 */
export function edit(payload: RoundInterface): Promise<any> {
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

  return httpHelper.getResponse(queryAPI, mutation);
}

/**
 * Delete an existing round.
 *
 * @export
 * @param {IDInterface} payload
 * @returns {Promise<any>}
 */
export function remove(payload: IDInterface): Promise<any> {
  const queryAPI = ROUNDS.DELETE;

  const mutation = `
    mutation {
      ${queryAPI} (id: ${payload.id}) {
        message
      }
    }
  `;

  return httpHelper.getResponse(queryAPI, mutation);
}
