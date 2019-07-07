import Context from '../models/Context';
import User from '../models/UserAccount';

export default {
  users: async (parent: any, args: any, context: Context, info: any) => {
    const users = await new User().fetchAll();

    return users.serialize();
  },
  user: async (parent: any, args: any, context: Context, info: any) => {
    const { id } = args;

    if (!id) {
      return null;
    }

    const user = await new User().where({ id }).fetch();

    return user.serialize();
  }
};
