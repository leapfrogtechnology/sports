import * as dotenv from 'dotenv';
import HttpStatusCodes from 'http-status-codes';

import http from './http';
import { getResponse } from './httpHelper';
import { AUTH } from '../constants/queries';
import { getUserSession, setUserSession, clearUserSession } from '../services/storage';

const AUTHORIZATION_HEADER = 'Authorization';

dotenv.config();

/**
 * Setup the interceptor.
 *
 * @export
 */
export default function setup() {
  http.interceptors.response.use(async (response: any) => {
    const responseCode =
      response &&
      response.data &&
      response.data.errors &&
      response.data.errors[0] &&
      response.data.errors[0].extensions &&
      response.data.errors[0].extensions.code;

    if (
      responseCode === HttpStatusCodes.FORBIDDEN.toString() ||
      responseCode === HttpStatusCodes.UNAUTHORIZED.toString()
    ) {
      const originalRequest = response.config;
      const code = parseInt(responseCode, 10);
      const sessionInfo = getUserSession();

      if (code === HttpStatusCodes.UNAUTHORIZED) {
        try {
          // Hit API to get new access token using refresh token
          const queryAPI = AUTH.REFRESH_ACCESS_TOKEN;

          const mutation = `
              mutation {
                ${queryAPI} (refreshToken: "${sessionInfo && sessionInfo.refreshToken}") {
                  message,
                  accessToken
                }
              }
            `;

          const refreshAccessTokenResponse: any = await getResponse(queryAPI, mutation);

          setUserSession({
            refreshToken: (sessionInfo && sessionInfo.refreshToken) || '',
            accessToken: refreshAccessTokenResponse.accessToken
          });

          originalRequest.headers[AUTHORIZATION_HEADER] = getAuthorizationHeader(
            refreshAccessTokenResponse.accessToken
          );

          return http.request(originalRequest);
        } catch (error) {
          throw error;
        }
      }

      if (code === HttpStatusCodes.FORBIDDEN) {
        await clearUserSession();

        // Reload the page and since the tokens are removed, it redirects to login.
        window.location.reload();
      }

      originalRequest.headers[AUTHORIZATION_HEADER] = getAuthorizationHeader(
        sessionInfo ? sessionInfo.accessToken : ''
      );

      return Promise.reject(response);
    }

    return response;
  });

  http.interceptors.request.use(authorizationInterceptor);
}

/**
 * Interceptor to add Access Token Header in all requests.
 *
 * @param {*} request
 * @returns {any}
 */
function authorizationInterceptor(request: any): any {
  const sessionInfo = getUserSession();
  const accessToken = sessionInfo && sessionInfo.accessToken;

  // If the access token is not present in the local storage,
  // but isn't set in the request authorization header; set it.
  if (accessToken && !request.headers[AUTHORIZATION_HEADER]) {
    request.headers[AUTHORIZATION_HEADER] = getAuthorizationHeader(accessToken);
  }

  return request;
}

/**
 * Get the Authorization Header value.
 *
 * @param {string} accessToken
 * @returns {string}
 */
function getAuthorizationHeader(accessToken: string): string {
  return `Bearer ${accessToken}`;
}
