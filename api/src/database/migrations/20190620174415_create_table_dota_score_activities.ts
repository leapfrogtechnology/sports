import Knex from 'knex';

import TABLES from '../../constants/tables';

/**
 * Add dota_score_activities table.
 *
 * @param {Knex} knex
 */
export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TABLES.DOTA_SCORE_ACTIVITIES, (table: Knex.CreateTableBuilder) => {
    table.increments('id').primary();

    table
      .integer('dota_score_id')
      .notNullable()
      .references('id')
      .inTable(TABLES.DOTA_SCORES);
    table.integer('set').notNullable();
    table
      .integer('winner_team_id')
      .notNullable()
      .references('id')
      .inTable(TABLES.TEAMS);
    table
      .integer('updated_by')
      .notNullable()
      .references('id')
      .inTable(TABLES.USER_ACCOUNTS);

    table.timestamps(true, true);
  });
}

/**
 * Drop dota_score_activities table.
 *
 * @param {Knex} knex
 */
export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLES.DOTA_SCORE_ACTIVITIES);
}
