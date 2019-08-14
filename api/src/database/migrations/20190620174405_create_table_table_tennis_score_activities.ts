import Knex from 'knex';

import TABLES from '../../constants/tables';

/**
 * Add table_tennis_score_activities table.
 *
 * @param {Knex} knex
 */
export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TABLES.TABLE_TENNIS_SCORE_ACTIVITIES, (table: Knex.CreateTableBuilder) => {
    table.increments('id').primary();

    table
      .integer('table_tennis_score_id')
      .notNullable()
      .references('id')
      .inTable(TABLES.TABLE_TENNIS_SCORES);
    table.integer('set').notNullable();
    table.integer('home_team_points').notNullable();
    table.integer('away_team_points').notNullable();
    table
      .integer('updated_by')
      .notNullable()
      .references('id')
      .inTable(TABLES.USER_ACCOUNTS);

    table.timestamps(true, true);
  });
}

/**
 * Drop table_tennis_score_activities table.
 *
 * @param {Knex} knex
 */
export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLES.TABLE_TENNIS_SCORE_ACTIVITIES);
}
