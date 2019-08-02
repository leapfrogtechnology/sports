import cors from 'cors';
import express from 'express';
import compression from 'compression';
import depthLimit from 'graphql-depth-limit';
import { ApolloServer } from 'apollo-server-express';

import schema from './schema';
import * as dbConfig from './config/database';

const app = express();
const server = new ApolloServer({
  schema,
  validationRules: [depthLimit(7)]
});
app.use('*', cors());
app.use(compression());
server.applyMiddleware({ app, path: '/graphql' });

// Initialize database.
dbConfig.bootstrap();

app.get('/', (req, res) => res.send('Hello World!'));

const { PORT = 3000 } = process.env;

app.listen({ port: PORT }, (): void =>
  //tslint:disable
  console.log(`\n🚀    GraphQL is now running on http://localhost:${PORT}/graphql`)
);
