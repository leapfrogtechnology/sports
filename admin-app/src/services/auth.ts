import { AUTH } from '../constants/queries';
import * as httpHelper from '../utils/httpHelper';
import * as storageService from '../services/storage';

/**
 * Check login by username and password.
 *
 * @export
 * @param {string} userEmail
 * @param {string} userPassword
 * @returns
 */
export function checkIfLoggedIn(userEmail: string, userPassword: string) {
  const queryAPI = `login`;

  const mutation = `
    mutation {
      ${queryAPI} (email: "${userEmail}", password: "${userPassword}") {
        refreshToken,
        accessToken
      }
    }
  `;

  return httpHelper.getResponse(queryAPI, mutation);
}

/**
 * Get information of the logged in user.
 *
 * @export
 * @returns {Promise<object>}
 */
export function getUserInfo(): Promise<object> {
  const queryAPI = AUTH.USER_INFO;
  const userSession: any = storageService.getUserSession();

  const mutation = `
    mutation {
      ${queryAPI} (refreshToken: "${userSession.refreshToken}") {
        id,
        firstName,
        lastName,
        profilePictureUrl
      }
    }
  `;

  return httpHelper.getResponse(queryAPI, mutation);
}

/**
 * Log out the current session.
 *
 * @export
 */
export function logOut() {
  storageService.logOut();
}
