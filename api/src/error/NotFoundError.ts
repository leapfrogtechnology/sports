import CustomError from './CustomError';

/**
 * Not found error class to handle  Not found errors.
 */
class NotFoundError extends CustomError {
  constructor(message: string, public details?: string) {
    super(message, details);
  }
}

export default NotFoundError;
