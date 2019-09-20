import { EMPLOYEES } from '../constants/queries';
import * as httpHelper from '../utils/httpHelper';

/**
 * Fetch the list of all employees.
 *
 * @export
 * @returns {Promise<any>}
 */
export function fetchAll(): Promise<any> {
  const queryAPI = EMPLOYEES.ALL;

  const query = `
    query {
      ${queryAPI} {
        id,
        email,
        status,
        lastName,
        firstName,
        middleName,
        emsEmployeeId,
        profilePictureUrl
      }
    }
  `;

  return httpHelper.getResponse(queryAPI, query);
}

/**
 * Fetch one employee's information.
 *
 * @export
 * @returns {Promise<any>}
 */
export function fetchOne(): Promise<any> {
  const queryAPI = EMPLOYEES.ONE;

  const query = `
    query {
      ${queryAPI} {
        id,
        email,
        status,
        lastName,
        firstName,
        middleName,
        emsEmployeeId,
        profilePictureUrl
      }
    }
  `;

  return httpHelper.getResponse(queryAPI, query);
}
