import { IdInterface } from '../domains/General';
import * as httpHelper from '../utils/httpHelper';
import { CATEGORIES } from '../constants/queries';
import CategoryInterface from '../domains/models/Category';

/**
 * Fetch the list of all categories.
 *
 * @export
 * @returns {Promise<any>}
 */
export async function fetchAll(): Promise<any> {
  const queryAPI = CATEGORIES.ALL;

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
 * Create a new category.
 *
 * @export
 * @param {CategoryInterface} payload
 * @returns {Promise<any>}
 */
export async function create(payload: CategoryInterface): Promise<any> {
  const queryAPI = CATEGORIES.CREATE;

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
 * Edit an existing category.
 *
 * @export
 * @param {CategoryInterface} payload
 * @returns {Promise<any>}
 */
export async function edit(payload: CategoryInterface): Promise<any> {
  const queryAPI = CATEGORIES.EDIT;

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
 * Delete an existing category.
 *
 * @export
 * @param {IdInterface} payload
 * @returns {Promise<any>}
 */
export async function remove(payload: IdInterface): Promise<any> {
  const queryAPI = CATEGORIES.DELETE;

  const mutation = `
    mutation {
      ${queryAPI} (id: ${payload.id}) {
        message
      }
    }
  `;

  return await httpHelper.getResponse(queryAPI, mutation);
}
