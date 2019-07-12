import HttpStatus from 'http-status-codes';

import CustomError from './CustomError';

/**
 * Not found error class to handle  Not found errors.
 */
class NotFoundError extends CustomError {
  constructor(message: string, public details?: string) {
    super(message, details, HttpStatus.NOT_FOUND);
  }
}

export default NotFoundError;
