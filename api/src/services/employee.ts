import http from '../utils/https';
import appConfig from '../config/appConfig';
import { getLMSCoreHeader } from './header';

import Employee from '../models/Employee';
import { LMSEmployee } from '../domains/employee';

/**
 * Fetch employees list from LMS.
 *
 * @returns {Array} : Array of employees.
 */
export async function fetchLMSEmployee() {
  const { lms } = appConfig;

  const headers = getLMSCoreHeader();

  if (!lms.baseURI) {
    throw new Error('Not set LMS url');
  }

  try {
    const { data } = await http.get(lms.baseURI, { headers });

    return structureEmployees(data);
  } catch (err) {
    throw err;
  }
}

/**
 * Format and structure the employee object by removing unnecessary fields.
 *
 * @param employees : Array of employees.
 * @returns {Array} : Array of structured employees.
 */
function structureEmployees(employees: LMSEmployee[]) {
  return employees.map((employee: LMSEmployee) => {
    const { username, firstName, lastName, middleName, empId, avatarUrl, empStatus } = employee;

    return {
      firstName,
      middleName,
      lastName,
      email: username,
      status: empStatus,
      emsEmployeeId: parseInt(empId, 10),
      profilePictureUrl: avatarUrl
    };
  });
}

/**
 * Stores list of employees to the database.
 *
 * @param employees : List of employee object.
 */
export async function storeEmployees(employees: any) {
  try {
    await Employee.collection()
      .add(employees)
      .invokeThen('save');

    return await fetchAllEmployees();
  } catch {
    throw new Error('Failed to fetch employee data');
  }
}

/**
 * Fetch All employees.
 *
 * @returns {Array} : List of employees.
 */
export async function fetchAllEmployees() {
  try {
    const employees = await new Employee().fetchAll();

    return employees.serialize();
  } catch {
    throw new Error('Failed to fetch employee data');
  }
}

/**
 * Fetch the employee record with the given id.
 *
 * @param id : Id of the employee record.
 * @returns {Object} : Employee object.
 */
export async function fetchEmployee(id: number) {
  try {
    if (!id) {
      return null;
    }

    const user = await new Employee().where({ id }).fetch();

    return user.serialize();
  } catch {
    throw new Error('Failed to fetch employee data');
  }
}
