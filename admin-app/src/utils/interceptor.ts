import axios from 'axios';
import * as dotenv from 'dotenv';
import HttpStatusCodes from 'http-status-codes';

import http from './http';
import {getUserSession,setUserSession} from '../services/storage';


const AUTHORIZATION_HEADER = 'authorization';
dotenv.config();

const baseURI = process.env.VUE_APP_API_BASE_URL;

/**
 * Get the Authorization Header value.
 *
 * @param {string} accessToken
 * @returns {string}
 */
function getAuthorizationHeader(accessToken: string): string {
  return `Bearer ${accessToken}`;
}

/**
 * Interceptor to catch Unauthorized responses and refresh the access token.
 *
 * @param {any} err - Response error
 */
export async function unauthorizedResponseHandlerInterceptor(err: any) {
  if (
    err.response &&
    err.response.config &&
    err.response.config.url === baseURI
  ) {
    setUserSession({refreshToken:null,accessToken:null});

    return Promise.reject(err);
  }

  const originalRequest = err.config;
  const code = err.response && err.response.data && err.response.data.code;
  const sessionInfo = getUserSession();


  if (code === HttpStatusCodes.UNAUTHORIZED && !originalRequest['__isRetryRequest']) {
    originalRequest.__isRetryRequest = true;

    try {
      // Hit api to get new access token using refresh token

      const accessToken=await apiRequ(sessionInfo&&sessionInfo.refreshToken)

      setUserSession({refreshToken:sessionInfo&&sessionInfo.refreshToken,accessToken});


      originalRequest.headers[AUTHORIZATION_HEADER] = getAuthorizationHeader(accessToken.value);

      return http.request(originalRequest);
    } catch (error) {
      throw error;
    }
  }

  originalRequest.headers[AUTHORIZATION_HEADER] = getAuthorizationHeader(sessionInfo?sessionInfo.accessToken:'');

  return Promise.reject(err);
}

/**
 * Interceptor to add Access Token header in all requests.
 *
 * @param {Request} request
 * @returns {Request}
 */
export function authorizationInterceptor(request: Request): Request {
  const sessionInfo = getUserSession();
  const accessToken=sessionInfo&&sessionInfo.accessToken;

  // If the access token is not present in the local storage,
  // but isn't set in the request authorization header; set it.
  if (accessToken && !request.headers[AUTHORIZATION_HEADER]) {
    request.headers[AUTHORIZATION_HEADER] = getAuthorizationHeader(accessToken);
  }

  return request;
}

export default function setup() {
  http.interceptors.response.use(
    /**
     * Leave response as it is.
     */
    (response:any) => response,
    /**
     * This interceptor checks if the response had a 401 status code, which means
     * that the access token used for the request has expired. It then refreshes
     * the access token and resends the original request.
     */
    unauthorizedResponseHandlerInterceptor
  );

  http.interceptors.request.use(authorizationInterceptor);
}
