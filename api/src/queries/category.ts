import Context from '../models/Context';
import Category from '../domains/category';
import { validateContext } from '../utils/validations';
import * as categoryServices from '../services/category';

/**
 * Query for fetching the list of all categories.
 *
 * @export
 * @param {*} parent
 * @param {Category} payload
 * @param {Context} context
 * @returns {Promise<object>}
 */
export async function categories(parent: any, payload: Category, context: Context): Promise<object> {
  validateContext(context);

  return categoryServices.fetchAll();
}
