import { buildError } from '../utils/errors';
import Context from '../models/Context';

import * as userService from '../service/user';

export const login = async (
  parent: any,
  { password, email }: { password: string; email: string },
  context: Context
) => {
  try {
    const data = await userService.loginUser(password, email);

    return { ...data };
  } catch (err) {
    return buildError(err);
  }
};
