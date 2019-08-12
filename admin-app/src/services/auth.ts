import axios from 'axios';

import * as httpHelper from '../utils/httpHelper';

/**
 * Check login by username and password.
 *
 * @export
 * @param {string} userEmail
 * @param {string} userPassword
 * @returns
 */
export async function checkLogin(userEmail: string, userPassword: string) {
  const queryApi = `login`;

  const mutation = `
    mutation {
      ${queryApi} (email: "${userEmail}", password: "${userPassword}") {
        message,
        code,
        data,
        refreshToken,
        accessToken
      }
    }
  `;

  return await httpHelper.getResponse(queryApi, mutation);
}
