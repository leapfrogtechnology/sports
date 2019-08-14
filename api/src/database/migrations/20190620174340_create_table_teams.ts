import Knex from 'knex';

import TABLES from '../../constants/tables';

/**
 * Add teams table.
 *
 * @param {Knex} knex
 */
export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TABLES.TEAMS, (table: Knex.CreateTableBuilder) => {
    table.increments('id').primary();

    table.string('name').notNullable();
    table.text('logo');
    table
      .integer('sub_tournament_id')
      .notNullable()
      .references('id')
      .inTable(TABLES.SUB_TOURNAMENTS);
    table
      .integer('updated_by')
      .notNullable()
      .references('id')
      .inTable(TABLES.USER_ACCOUNTS);

    table.timestamps(true, true);
  });
}

/**
 * Drop teams table.
 *
 * @param {Knex} knex
 */
export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLES.TEAMS);
}
