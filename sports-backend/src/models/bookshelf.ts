import * as Knex from 'knex';
import * as dotenv from 'dotenv';
import * as BookShelf from 'bookshelf';

dotenv.config({
  path: '.env'
});

const connection = Knex({
  client: process.env.DB_CLIENT,
  connection: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: 'src/migrations'
  }
});

export default BookShelf(connection);
