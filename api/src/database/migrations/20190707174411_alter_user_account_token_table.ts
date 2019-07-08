import Knex from 'knex';

import TABLES from '../../constants/tables';

/**
 * Alters table user_account_token
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex: Knex): any {
  return knex.schema.table(TABLES.USER_ACCOUNT_TOKENS, table => {
    table.text('refresh_token').alter();
  });
}

/**
 * Reverses the alter of table user_account_token
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex: Knex): any {
  return knex.schema.table(TABLES.USER_ACCOUNT_TOKENS, table => {
    table.string('refresh_token').alter();
  });
}
