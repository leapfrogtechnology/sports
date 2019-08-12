import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const baseUrl = process.env.VUE_APP_API_BASE_URL;

/**
 * Fetch response using the query/mutation.
 *
 * @export
 * @param {string} queryApi
 * @param {string} query
 * @returns
 */
export async function getResponse(queryApi: string, query: string) {
  const response = await axios({
    url: baseUrl,
    method: 'POST',
    data: {
      query
    }
  });

  const data = response && response.data && response.data.data && response.data.data[queryApi];

  if (data && data.code && data.code === 200) {
    return data;
  }

  throw new Error(data.message || 'An error occurred');
}
