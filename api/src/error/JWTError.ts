import CustomError from './CustomError';

/**
 * JWT error class to handle JWT errors.
 */
class JWTError extends CustomError {
  constructor(message: string, public details?: string) {
    super(message, details);
  }
}

export default JWTError;
