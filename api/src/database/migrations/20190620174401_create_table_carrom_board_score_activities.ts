import Knex from 'knex';

import TABLES from '../../constants/tables';

/**
 * Add carrom_board_score_activities table.
 *
 * @param {Knex} knex
 */
export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TABLES.CARROM_BOARD_SCORE_ACTIVITIES, (table: Knex.CreateTableBuilder) => {
    table.increments('id').primary();

    table
      .integer('carrom_board_score_id')
      .notNullable()
      .references('id')
      .inTable(TABLES.CARROM_BOARD_SCORES);
    table
      .integer('team')
      .notNullable()
      .references('id')
      .inTable(TABLES.TEAMS);
    table.integer('set').notNullable();
    table.integer('points').notNullable();
    table
      .integer('updated_by')
      .notNullable()
      .references('id')
      .inTable(TABLES.USER_ACCOUNTS);

    table.timestamps(true, true);
  });
}

/**
 * Drop carrom_board_score_activities table.
 *
 * @param {Knex} knex
 */
export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLES.CARROM_BOARD_SCORE_ACTIVITIES);
}
