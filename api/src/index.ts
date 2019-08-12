import cors from 'cors';
import express from 'express';
import compression from 'compression';
import depthLimit from 'graphql-depth-limit';
import { ApolloServer } from 'apollo-server-express';

import schema from './schema';
import routes from './routes';
import knex from './config/knex';

const app = express();
const server = new ApolloServer({
  schema,
  validationRules: [depthLimit(7)],
  context: async () => {
    return {
      db: knex
    };
  }
});
app.use('*', cors());
app.use(compression());
app.use(routes);
server.applyMiddleware({ app, path: '/graphql' });

// Make Apex compatible
const { PORT = 3000 } = process.env;

app.listen({ port: PORT }, (): void =>
  /* tslint:disable-next-line */
  console.log(`\n🚀    GraphQL is now running on http://localhost:${PORT}/graphql`)
);
