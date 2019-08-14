import Knex from 'knex';

import TABLES from '../../constants/tables';

/**
 * Add counter_strike_score_sets table.
 *
 * @param {Knex} knex
 */
export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TABLES.COUNTER_STRIKE_SCORE_SETS, (table: Knex.CreateTableBuilder) => {
    table.increments('id').primary();

    table
      .integer('counter_strike_score_id')
      .notNullable()
      .references('id')
      .inTable(TABLES.COUNTER_STRIKE_SCORES);
    table.integer('set').notNullable();
    table.integer('home_team_score').notNullable();
    table.integer('away_team_score').notNullable();
    table
      .integer('updated_by')
      .notNullable()
      .references('id')
      .inTable(TABLES.USER_ACCOUNTS);

    table.timestamps(true, true);
  });
}

/**
 * Drop counter_strike_score_sets table.
 *
 * @param {Knex} knex
 */
export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLES.COUNTER_STRIKE_SCORE_SETS);
}
