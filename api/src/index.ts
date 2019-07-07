import cors from 'cors';
import express from 'express';
import compression from 'compression';
import depthLimit from 'graphql-depth-limit';
import { ApolloServer } from 'apollo-server-express';

import schema from './schema';
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
server.applyMiddleware({ app, path: '/graphql' });

app.get('/test', (req, res) => res.send('Hello World!'));

//tslint:disable
// Make Apex compatible
const { PORT = 3000 } = process.env;

app.listen({ port: PORT }, (): void =>
  /* eslint-disable-next-line no-console */
  console.log(`\n🚀    GraphQL is now running on http://localhost:${PORT}/graphql`)
);
