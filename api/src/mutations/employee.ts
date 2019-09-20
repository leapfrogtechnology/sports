import Context from '../models/Context';
import { validateContext } from '../utils/validations';
import * as employeeServices from '../services/employee';

/**
 * Mutation to sync the list of employees.
 *
 * @export
 * @param {*} parent
 * @param {{}} payload
 * @param {Context} context
 * @returns {Promise<object>}
 */
export function syncEmployees(parent: any, payload: {}, context: Context): Promise<object> {
  validateContext(context);

  return employeeServices.syncEmployees();
}
