import * as dotenv from 'dotenv';
import axios, { AxiosRequestConfig } from 'axios';

import { getUserSession } from '../services/storage';

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
  const userSession: any = getUserSession();

  const config: AxiosRequestConfig = {
    url: baseUrl,
    method: 'POST',
    data: {
      query
    }
  };

  if (userSession) {
    config.headers = {
      Authorization: `Bearer ${userSession.accessToken}`
    };
  }

  const response = await axios(config);

  const errors = response && response.data && response.data.errors;

  if (errors) {
    throw new Error(errors[0].message);
  }

  return response && response.data && response.data.data && response.data.data[queryAPI];
}
