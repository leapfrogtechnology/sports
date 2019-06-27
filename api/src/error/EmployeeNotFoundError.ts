import CustomError from './CustomError';

/**
 * Employee error class to handle Employee Not found errors.
 */
class EmployeeNotFoundError extends CustomError {
  constructor(message: string, public details?: string) {
    super(message, details);
  }
}

export default EmployeeNotFoundError;
