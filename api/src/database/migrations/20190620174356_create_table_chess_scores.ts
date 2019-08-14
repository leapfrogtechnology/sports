import Knex from 'knex';

import TABLES from '../../constants/tables';

/**
 * Add chess_scores table.
 *
 * @param {Knex} knex
 */
export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TABLES.CHESS_SCORES, (table: Knex.CreateTableBuilder) => {
    table.increments('id').primary();

    table
      .integer('fixture_id')
      .notNullable()
      .references('id')
      .inTable(TABLES.FIXTURES);
    table
      .integer('winner_team_id')
      .notNullable()
      .references('id')
      .inTable(TABLES.TEAMS);
    table
      .integer('winning_method_id')
      .notNullable()
      .references('id')
      .inTable(TABLES.CHESS_WINNING_METHODS);
    table
      .integer('updated_by')
      .notNullable()
      .references('id')
      .inTable(TABLES.USER_ACCOUNTS);

    table.timestamps(true, true);
  });
}

/**
 * Drop chess_scores table.
 *
 * @param {Knex} knex
 */
export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLES.CHESS_SCORES);
}
