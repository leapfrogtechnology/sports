import Knex from 'knex';

import { LoggedInUser } from '../domains/user';

interface Context {
  db: Knex;
  error: any;
  authToken: string;
  user: LoggedInUser;
}

export default Context;
