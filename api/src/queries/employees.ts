import Context from '../models/Context';

import { fetchAllEmployees, fetchEmployee } from '../services/employee';

/**
 * Returns all the employees
 *
 * @returns {Array}
 */
export async function employees() {
  return fetchAllEmployees();
}

/**
 * Returns the employee given the employee id.
 *
 * @param parent: The object that contains the result returned from the resolver on the parent field
 * @param args:  An object with the arguments passed into the field in the query
 * @param context: This is an object shared by all resolvers in a particular query
 * @returns {object}
 */
export async function employee(parent: any, { id }: { id: number }, context: Context) {
  return fetchEmployee(id);
}
