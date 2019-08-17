import axios from 'axios';
import * as dotenv from 'dotenv';
import httpStatusCodes from 'http-status-codes';

dotenv.config();

const baseUrl = process.env.VUE_APP_API_BASE_URL;

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
  const response = await axios({
    url: baseUrl,
    method: 'POST',
    data: {
      query
    }
  });

  const errors = response && response.data && response.data.errors;

  if (errors) {
    throw new Error(errors[0].message);
  }

  return response && response.data && response.data.data && response.data.data[queryAPI];
}
