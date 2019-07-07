import { buildError } from '../utils/errors';
import Context from '../models/Context';

import * as userService from '../service/user';

export const login = async (parent: any, args: any, context: Context, info: any) => {
  try {
    const data = await userService.loginUser(args.password, args.email);

    return { ...data };
  } catch (err) {
    return buildError(err);
  }
};
