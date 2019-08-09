import JWTError from './JWTError';

/**
 * Validation error class to handle Validation errors.
 */
class ValidationError extends JWTError {
  constructor(message: string, public details?: string) {
    super(message, details);
  }
}

export default ValidationError;
