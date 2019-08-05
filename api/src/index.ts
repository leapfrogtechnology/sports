import cors from 'cors';
import express from 'express';
import compression from 'compression';
import depthLimit from 'graphql-depth-limit';
import { ApolloServer } from 'apollo-server-express';

import * as dbConfig from './config/database';

// Initialize database.
// It needs to be here, do not move, please.
dbConfig.bootstrap();

import schema from './schema';
import routes from './routes';

const app = express();
const server = new ApolloServer({
  schema,
  validationRules: [depthLimit(7)]
});
app.use('*', cors());
app.use(compression());
app.use(routes);
server.applyMiddleware({ app, path: '/graphql' });

const { PORT = 3000 } = process.env;

app.listen({ port: PORT }, (): void =>
  //tslint:disable
  console.log(`\n🚀    GraphQL is now running on http://localhost:${PORT}/graphql`)
);
