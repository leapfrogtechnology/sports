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
    const verifiedUser: any = await verify(token);

    return { user: withOnlyAttrs(verifiedUser.user, ['id', 'employeeId']) };
  } catch (error) {
    return { error };
  }
}
