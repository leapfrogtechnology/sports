import Knex from 'knex';
import * as dotenv from 'dotenv';
import { toCamelCase, toSnakeCase } from '../utils/object';

dotenv.config();

const config: Knex.Config = {
  client: process.env.DB_CLIENT,
  connection: {
    charset: 'utf8',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
  },
  postProcessResponse: (result: any) => {
    if (Array.isArray(result)) {
      return result.map(row => toCamelCase(row));
    }

    return toCamelCase(result);
  },
  wrapIdentifier: (value: string, origImpl: any) => {
    if (value !== '*') {
      return origImpl(toSnakeCase(value));
    }

    return value;
  }
};

/**
 * Database connection.
 */
export default Knex(config);
