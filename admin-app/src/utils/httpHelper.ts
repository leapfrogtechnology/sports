import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const baseUrl = process.env.VUE_APP_API_BASE_URL;

export async function getResponse(query: string) {
  const response = await axios({
    url: baseUrl,
    method: 'POST',
    data: {
      query
    }
  });

  return response;
}
