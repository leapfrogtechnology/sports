import http from '../utils/https';
import appConfig from '../config/appConfig';
import { getLMSCoreHeader } from './header';

import { LMSEmployee } from '../domains/employee';

/**
 * Fetch employees list from LMS.
 *
 * @returns {Promise}
 */
export async function fetchEmployeeList() {
  const { apiEndPoints } = appConfig;

  const headers = getLMSCoreHeader();

  const {
    data: { data: employees }
  } = await http.get(apiEndPoints.employees, { headers });

  return structureEmployees(employees);
}

/**
 * Format and structure the employee object by removing unnecessary fields.
 *
 * @param employees : array of employees
 * @returns {Array} : array of structured employees
 */
function structureEmployees(employees: LMSEmployee[]) {
  return employees.map((employee: LMSEmployee) => {
    const { email, firstName, lastName, middleName, empId, avatarUrl } = employee;

    return {
      email,
      firstName,
      middleName,
      lastName,
      status: 'aa',
      emsEmployeeId: empId,
      profilePictureUrl: avatarUrl
    };
  });
}
