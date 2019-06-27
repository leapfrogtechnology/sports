import { IResolvers } from 'graphql-tools';
import HttpStatus from 'http-status-codes';

import Context from './models/Context';
import User from './models/UserAccount';
import { buildError } from './utils/errors';

import * as userService from './service/user';

const resolverMap: IResolvers = {
  Query: {
    users: async (parent, args, context: Context, info) => {
      const users = await new User().fetchAll();

      return users.serialize();
    },
    user: async (parent, args, context: Context, info) => {
      const { id } = args;

      if (!id) {
        return null;
      }

      const user = await new User().where({ id }).fetch();

      return user.serialize();
    }
  },
  Mutation: {
    signUp: async (parent, args, context: Context, info) => {
      try {
        await userService.createUser(args.password, args.email);

        return { message: 'success', code: HttpStatus.CREATED };
      } catch (err) {
        return buildError(err);
      }
    },
    login: async (parent, args, context: Context, info) => {
      try {
        const data = await userService.loginUser(args.password, args.email);

        return { ...data };
      } catch (err) {
        return buildError(err);
      }
    }
  }
};

export default resolverMap;
