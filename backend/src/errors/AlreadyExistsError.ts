import * as HttpStatus from 'http-status-codes';

import Error from './Error';

/**
 * @class AlreadyExistsError
 * @extends {Error}
 */
class AlreadyExistsError extends Error {
  /**
   * Error message to be thrown.
   *
   * @type {string}
   * @memberof ForbiddenError
   */
  message: string;

  /**
   * Creates an instance of ForbiddenError.
   *
   * @param {string} message
   * @memberof ForbiddenError
   */
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);

    this.message = message;
  }
}

export default AlreadyExistsError;
