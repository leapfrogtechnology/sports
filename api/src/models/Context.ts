import Knex from 'knex';

interface Context {
  db: Knex;
  error: any;
  authToken: string;
}

export default Context;
