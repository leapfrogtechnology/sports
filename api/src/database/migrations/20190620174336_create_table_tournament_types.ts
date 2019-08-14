import Knex from 'knex';

import TABLES from '../../constants/tables';

/**
 * Add tournament_types table.
 *
 * @param {Knex} knex
 */
export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TABLES.TOURNAMENT_TYPES, (table: Knex.CreateTableBuilder) => {
    table.increments('id').primary();

    table.string('name').notNullable();

    table.timestamps(true, true);
  });
}

/**
 * Drop tournament_types table.
 *
 * @param {Knex} knex
 */
export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLES.TOURNAMENT_TYPES);
}
