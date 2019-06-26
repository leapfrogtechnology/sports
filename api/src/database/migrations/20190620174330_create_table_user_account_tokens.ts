import Knex from 'knex';

import TABLES from '../../constants/tables';

/**
 * Add user_account_tokens table.
 *
 * @param {Knex} knex
 */
export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TABLES.USER_ACCOUNT_TOKENS, (table: Knex.CreateTableBuilder) => {
    table.increments('id').primary();

    table
      .integer('user_account_id')
      .notNullable()
      .references('id')
      .inTable(TABLES.USER_ACCOUNTS);
    table.string('refresh_token').notNullable();

    table.timestamps(true, true);
  });
}

/**
 * Drop user_account_tokens table.
 *
 * @param {Knex} knex
 */
export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLES.USER_ACCOUNT_TOKENS);
}
