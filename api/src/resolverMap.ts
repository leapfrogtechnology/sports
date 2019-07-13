import { IResolvers } from 'graphql-tools';

import query from './queries';
import mutation from './mutations';

const resolverMap: IResolvers = {
  Query: query,
  Mutation: mutation
};

export default resolverMap;
