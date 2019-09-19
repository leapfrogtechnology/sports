import { IDInterface } from '../domains/General';
import * as httpHelper from '../utils/httpHelper';
import { CATEGORIES } from '../constants/queries';
import CategoryInterface from '../domains/models/Category';

/**
 * Fetch the list of all categories.
 *
 * @export
 * @returns {Promise<any>}
 */
export function fetchAll(): Promise<any> {
  const queryAPI = CATEGORIES.ALL;

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
 * Create a new category.
 *
 * @export
 * @param {CategoryInterface} payload
 * @returns {Promise<any>}
 */
export function create(payload: CategoryInterface): Promise<any> {
  const queryAPI = CATEGORIES.CREATE;

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
 * Edit an existing category.
 *
 * @export
 * @param {CategoryInterface} payload
 * @returns {Promise<any>}
 */
export function edit(payload: CategoryInterface): Promise<any> {
  const queryAPI = CATEGORIES.EDIT;

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
 * Delete an existing category.
 *
 * @export
 * @param {IDInterface} payload
 * @returns {Promise<any>}
 */
export function remove(payload: IDInterface): Promise<any> {
  const queryAPI = CATEGORIES.DELETE;

  const mutation = `
    mutation {
      ${queryAPI} (id: ${payload.id}) {
        message
      }
    }
  `;

  return httpHelper.getResponse(queryAPI, mutation);
}
