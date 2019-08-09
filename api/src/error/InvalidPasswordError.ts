import CustomError from './CustomError';

/**
 * Invalid Password error class to handle Invalid Password errors.
 */
class InvalidPassword extends CustomError {
  constructor(message: string, public details?: string) {
    super(message, details);
  }
}

export default InvalidPassword;
