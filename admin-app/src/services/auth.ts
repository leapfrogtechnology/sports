import * as httpHelper from '../utils/httpHelper';

/**
 * Check login by username and password.
 *
 * @export
 * @param {string} userEmail
 * @param {string} userPassword
 * @returns
 */
export async function checkIfLoggedIn(userEmail: string, userPassword: string) {
  const queryAPI = `login`;

  const mutation = `
    mutation {
      ${queryAPI} (email: "${userEmail}", password: "${userPassword}") {
        refreshToken,
        accessToken
      }
    }
  `;

  return await httpHelper.getResponse(queryAPI, mutation);
}
