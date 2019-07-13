import * as employeeServices from '../services/employee';

/**
 * Fetch employee list store it in the database.
 *
 * @returns {Array}
 */
export async function fetchEmployeeList() {
  try {
    const employees = await employeeServices.fetchEmployeeList();

    return employees;
  } catch (err) {
    throw err;
  }
}
