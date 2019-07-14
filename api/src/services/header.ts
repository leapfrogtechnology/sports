import appConfig from '../config/appConfig';

/**
 * Returns header with LMS core auth token setup.* @param {params} : Any extra parameter to be set in the header.
 * @returns {object} : Header setup with athentication.
 */
export function getLMSCoreHeader(params?: object) {
  const { apiKeys } = appConfig;

  return {
    apiKey: apiKeys.core,
    ...params
  };
}
