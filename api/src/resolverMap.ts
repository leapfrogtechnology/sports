import { IResolvers } from 'graphql-tools';

const resolverMap: IResolvers = {
  Query: {
    users: async () => ({ data: 'just testing :D' })
  }
};

export default resolverMap;
