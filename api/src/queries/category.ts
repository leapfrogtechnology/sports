import HttpStatus from 'http-status-codes';
import { ApolloError } from 'apollo-server-core';

import Context from '../models/Context';
import Category from '../domains/category';
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
  if (context.error) {
    throw new ApolloError(
      context.error,
      context.error.extensions ? context.error.extensions.code.toString() : HttpStatus.FORBIDDEN.toString()
    );
  }

  return categoryServices.fetchAll();
}
