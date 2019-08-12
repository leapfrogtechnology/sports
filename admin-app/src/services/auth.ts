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
  const mutation = `
    mutation {
      login (email: "${userEmail}", password: "${userPassword}") {
        message,
        code,
        data,
        refreshToken,
        accessToken
      }
    }
  `;

  return await httpHelper.getResponse(mutation);
}
