import http from '../utils/https';
import appConfig from '../config/appConfig';
import { getLMSCoreHeader } from './header';
import Employee from '../models/Employee';

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
 * @param employees : array of employees.
 * @returns {Array} : array of structured employees.
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
    throw new Error('aaaaa');
  }
}

/**
 * Fetch All employees.
 *
 * @returns {Array} : List of employees.
 */
export async function fetchAllEmployees() {
  const employees = await new Employee().fetchAll();

  return employees.serialize();
}

/**
 * Fetch the employee record with the given id.
 *
 * @param id : Id of the employee record.
 * @returns {Object} : Employee object.
 */
export async function fetchEmployee(id: number) {
  if (!id) {
    return null;
  }

  const user = await new Employee().where({ id }).fetch();

  return user.serialize();
}
