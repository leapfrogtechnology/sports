import { verify } from '../utils/jwt';
import { withOnlyAttrs } from '../utils/object';

/**
 * Middleware for validating tokens
 *
 * @param {token} string
 * @returns {Promise<any>}
 */
export async function validateToken(token: string): Promise<any> {
  try {
    const data = await verify(token);

    return withOnlyAttrs(data, ['id', 'employeeId']);
  } catch (error) {
    return { error };
  }
}
