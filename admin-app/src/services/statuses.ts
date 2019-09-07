import { STATUSES } from '../constants/queries';
import { IdInterface } from '../domains/General';
import * as httpHelper from '../utils/httpHelper';
import StatusInterface from '../domains/models/Status';

/**
 * Fetch the list of all statuses.
 *
 * @export
 * @returns {Promise<any>}
 */
export async function fetchAll(): Promise<any> {
  const queryAPI = STATUSES.ALL;

  const query = `
    query {
      ${queryAPI} {
        id,
        name
      }
    }
  `;

  return await httpHelper.getResponse(queryAPI, query);
}

/**
 * Create a new status.
 *
 * @export
 * @param {StatusInterface} payload
 * @returns {Promise<any>}
 */
export async function create(payload: StatusInterface): Promise<any> {
  const queryAPI = STATUSES.CREATE;

  const mutation = `
    mutation {
      ${queryAPI} (name: "${payload.name}") {
        id,
        name
      }
    }
  `;

  return await httpHelper.getResponse(queryAPI, mutation);
}

/**
 * Edit an existing status.
 *
 * @export
 * @param {StatusInterface} payload
 * @returns {Promise<any>}
 */
export async function edit(payload: StatusInterface): Promise<any> {
  const queryAPI = STATUSES.EDIT;

  const mutation = `
    mutation {
      ${queryAPI} (id: ${payload.id}, name: "${payload.name}") {
        id,
        name
      }
    }
  `;

  return await httpHelper.getResponse(queryAPI, mutation);
}

/**
 * Delete an existing status.
 *
 * @export
 * @param {IdInterface} payload
 * @returns {Promise<any>}
 */
export async function remove(payload: IdInterface): Promise<any> {
  const queryAPI = STATUSES.DELETE;

  const mutation = `
    mutation {
      ${queryAPI} (id: ${payload.id}) {
        message
      }
    }
  `;

  return await httpHelper.getResponse(queryAPI, mutation);
}
