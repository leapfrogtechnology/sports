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
    const user = await verify(token);

    return { user: withOnlyAttrs(user, ['id', 'employeeId']) };
  } catch (error) {
    return { error };
  }
}
