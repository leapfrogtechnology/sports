import * as HttpStatus from 'http-status-codes';
import { ApolloError } from 'apollo-server-core';

import Context from '../models/Context';

/**
 * Validate context.
 * Throw an error if invalid.
 *
 * @export
 * @param {Context} context
 */
export function validateContext(context: Context) {
  // Check if the user is authenticated.
  if (context.error) {
    throw new ApolloError(
      context.error,
      context.error.extensions ? context.error.extensions.code.toString() : HttpStatus.FORBIDDEN.toString()
    );
  }
}
