import { STATUSES } from '../constants/queries';
import { IDInterface } from '../domains/General';
import * as httpHelper from '../utils/httpHelper';
import StatusInterface from '../domains/models/Status';

/**
 * Fetch the list of all statuses.
 *
 * @export
 * @returns {Promise<any>}
 */
export function fetchAll(): Promise<any> {
  const queryAPI = STATUSES.ALL;

  const query = `
    query {
      ${queryAPI} {
        id,
        name
      }
    }
  `;

  return httpHelper.getResponse(queryAPI, query);
}

/**
 * Create a new status.
 *
 * @export
 * @param {StatusInterface} payload
 * @returns {Promise<any>}
 */
export function create(payload: StatusInterface): Promise<any> {
  const queryAPI = STATUSES.CREATE;

  const mutation = `
    mutation {
      ${queryAPI} (name: "${payload.name}") {
        id,
        name
      }
    }
  `;

  return httpHelper.getResponse(queryAPI, mutation);
}

/**
 * Edit an existing status.
 *
 * @export
 * @param {StatusInterface} payload
 * @returns {Promise<any>}
 */
export function edit(payload: StatusInterface): Promise<any> {
  const queryAPI = STATUSES.EDIT;

  const mutation = `
    mutation {
      ${queryAPI} (id: ${payload.id}, name: "${payload.name}") {
        id,
        name
      }
    }
  `;

  return httpHelper.getResponse(queryAPI, mutation);
}

/**
 * Delete an existing status.
 *
 * @export
 * @param {IDInterface} payload
 * @returns {Promise<any>}
 */
export function remove(payload: IDInterface): Promise<any> {
  const queryAPI = STATUSES.DELETE;

  const mutation = `
    mutation {
      ${queryAPI} (id: ${payload.id}) {
        message
      }
    }
  `;

  return httpHelper.getResponse(queryAPI, mutation);
}
