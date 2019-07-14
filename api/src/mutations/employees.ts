import * as employeeServices from '../services/employee';

/**
 * Fetch employee list store it in the database.
 *
 * @returns {Array}
 */
export async function fetchEmployeeList() {
  try {
    const employees = await employeeServices.fetchLMSEmployee();

    return await employeeServices.storeEmployees(employees);
  } catch (err) {
    throw err;
  }
}
