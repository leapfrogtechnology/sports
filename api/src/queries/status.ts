import Status from '../domains/status';
import Context from '../models/Context';
import * as statusServices from '../services/status';
import { validateContext } from '../utils/validations';

/**
 * Query for fetching the list of all statuses.
 *
 * @export
 * @param {*} parent
 * @param {Status} payload
 * @param {Context} context
 * @returns {Promise<object>}
 */
export async function statuses(parent: any, payload: Status, context: Context): Promise<object> {
  validateContext(context);

  return statusServices.fetchAll();
}
