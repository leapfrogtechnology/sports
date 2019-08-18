import { verify } from '../utils/jwt';

export async function validateToken(token: string): Promise<any> {
  try {
    await verify(token);
  } catch (error) {
    return { error };
  }
}
