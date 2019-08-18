import cors from 'cors';
import express from 'express';
import compression from 'compression';
import depthLimit from 'graphql-depth-limit';
import { ApolloServer } from 'apollo-server-express';

import schema from './schema';
import routes from './routes';
import knex from './config/knex';
import { getTokenFromHeaders } from './authenticator';
import { validateToken } from './middlewares/validateToken';

const app = express();
const server = new ApolloServer({
  schema,
  validationRules: [depthLimit(7)],
  context: async ({ req }) => {
    let token = null;
    let data;

    try {
      const headerResponse = getTokenFromHeaders(req);

      if (headerResponse.token) {
        token = headerResponse.token;

        data = await validateToken(token);
      }
    } catch (e) {
      // Just logging for now. Lets add a dedicated logger here later
      console.warn(`Unable to authenticate using auth token: ${token}`);
    }

    return {
      token,
      ...data,
      db: knex
    };
  },
  playground: process.env.NODE_ENV !== 'production',
  debug: process.env.NODE_ENV !== 'production',
  formatError: err => {
    // Don't give the specific errors to the client.
    if (err.message.startsWith('Database Error: ')) {
      return new Error('Internal server error');
    }

    // Otherwise return the original error. The error can also
    // be manipulated in other ways, so long as it's returned.
    return err;
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
