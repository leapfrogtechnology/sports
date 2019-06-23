import JWTError from './JWTError';

/**
 * JWT error class to handle JWT errors.
 */
class JWTExpiredError extends JWTError {
  constructor(message: string, public details?: string) {
    super(message, details);
  }
}

export default JWTExpiredError;
