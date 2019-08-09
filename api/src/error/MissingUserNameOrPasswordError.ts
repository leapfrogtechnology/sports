import CustomError from './CustomError';

/**
 * Missing username or password error class to handle MIssing username or password errors.
 */
class MissingUserNameOrPassword extends CustomError {
  constructor(message: string, public details?: string) {
    super(message, details);
  }
}

export default MissingUserNameOrPassword;
