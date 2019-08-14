import Knex from 'knex';

import TABLES from '../../constants/tables';

/**
 * Add sub_tournament_players table.
 *
 * @param {Knex} knex
 */
export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TABLES.SUB_TOURNAMENT_PLAYERS, (table: Knex.CreateTableBuilder) => {
    table.increments('id').primary();

    table
      .integer('sub_tournament_id')
      .notNullable()
      .references('id')
      .inTable(TABLES.SUB_TOURNAMENTS);
    table
      .integer('employee_id')
      .notNullable()
      .references('id')
      .inTable(TABLES.EMPLOYEES);
    table.string('positions');
    table
      .integer('updated_by')
      .notNullable()
      .references('id')
      .inTable(TABLES.USER_ACCOUNTS);

    table.timestamps(true, true);
  });
}

/**
 * Drop sub_tournament_players table.
 *
 * @param {Knex} knex
 */
export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLES.SUB_TOURNAMENT_PLAYERS);
}
