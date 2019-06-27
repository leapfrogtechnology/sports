import * as HttpStatus from 'http-status-codes';

import CustomError from '../error/CustomError';

/**
 * Build error response for validation errors.
 *
 * @param  {error} err
 * @return {array|object}
 */
export function buildError(err: any) {
  if (err instanceof CustomError) {
    const httpCode = err.code ? err.code : HttpStatus.BAD_REQUEST;

    return {
      code: httpCode,
      message: err.message,
      data: err.details
    };
  }

  return {
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
    data: err.detail
  };
}
