import HttpStatus from 'http-status-codes';

import CustomError from './CustomError';

/**
 * Duplicate entry error class to handle Duplicate Entry errors.
 */
class DuplicateEntryError extends CustomError {
  constructor(message: string, public details?: string) {
    super(message, details, HttpStatus.CONFLICT);
  }
}

export default DuplicateEntryError;
