import CustomError from './CustomError';

/**
 * User error class to handle User not found errors.
 */
class UserNotFoundError extends CustomError {
  constructor(message: string, public details?: string) {
    super(message, details);
  }
}

export default UserNotFoundError;
