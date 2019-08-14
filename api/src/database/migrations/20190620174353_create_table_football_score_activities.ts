import Knex from 'knex';

import TABLES from '../../constants/tables';

/**
 * Add football_score_activities table.
 *
 * @param {Knex} knex
 */
export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TABLES.FOOTBALL_SCORE_ACTIVITIES, (table: Knex.CreateTableBuilder) => {
    table.increments('id').primary();

    table
      .integer('football_score_id')
      .notNullable()
      .references('id')
      .inTable(TABLES.FOOTBALL_SCORES);
    table
      .integer('team_player_id')
      .notNullable()
      .references('id')
      .inTable(TABLES.TEAM_PLAYERS);
    table
      .integer('activity_type_id')
      .notNullable()
      .references('id')
      .inTable(TABLES.FOOTBALL_ACTIVITY_TYPES);
    table
      .integer('assisted_by')
      .references('id')
      .inTable(TABLES.TEAM_PLAYERS);
    table.string('activity_time');
    table
      .integer('updated_by')
      .notNullable()
      .references('id')
      .inTable(TABLES.USER_ACCOUNTS);

    table.timestamps(true, true);
  });
}

/**
 * Drop football_score_activities table.
 *
 * @param {Knex} knex
 */
export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLES.FOOTBALL_SCORE_ACTIVITIES);
}
