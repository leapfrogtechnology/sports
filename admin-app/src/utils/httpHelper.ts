import * as dotenv from 'dotenv';

import http from './http';

dotenv.config();

const baseUrl = process.env.VUE_APP_API_BASE_URL || 'localhost:3000';

/**
 * Fetch response using the query/mutation.
 *
 * @export
 * @param {string} queryAPI
 * @param {string} query
 * @returns {object}
 * @throws {Error}
 */
export async function getResponse(queryAPI: string, query: string) {
  const response =  await  http.post(baseUrl, query);

  const errors = response && response.data && response.data.errors;

  if (errors) {
    throw new Error(errors[0].message);
  }

  return response && response.data && response.data.data && response.data.data[queryAPI];
}

