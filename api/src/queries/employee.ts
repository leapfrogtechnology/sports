import Context from '../models/Context';
import { IDPayload } from '../domains/general';
import EmployeeInterface from '../domains/employee';
import { validateContext } from '../utils/validations';
import * as employeeServices from '../services/employee';

/**
 * Query for fetching the list of all employees.
 *
 * @export
 * @param {*} parent
 * @param {EmployeeInterface} payload
 * @param {Context} context
 * @returns {Promise<any>}
 */
export function employees(parent: any, payload: EmployeeInterface, context: Context): Promise<any> {
  validateContext(context);

  return employeeServices.fetchAll();
}

/**
 * Query for fetching employee by ID.
 *
 * @export
 * @param {*} parent
 * @param {IDPayload} payload
 * @param {Context} context
 * @returns {Promise<any>}
 */
export function employee(parent: any, payload: IDPayload, context: Context): Promise<any> {
  validateContext(context);

  return employeeServices.fetchOne(payload.id);
}
