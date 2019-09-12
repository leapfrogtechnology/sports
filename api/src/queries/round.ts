import Round from '../domains/round';
import Context from '../models/Context';
import * as roundServices from '../services/round';
import { validateContext } from '../utils/validations';

/**
 * Query for fetching the list of all rounds.
 *
 * @export
 * @param {*} parent
 * @param {Round} payload
 * @param {Context} context
 * @returns {Promise<object>}
 */
export async function rounds(parent: any, payload: Round, context: Context): Promise<object> {
  validateContext(context);

  return roundServices.fetchAll();
}
