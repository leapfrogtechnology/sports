import Knex from 'knex';

import TABLES from '../../constants/tables';

/**
 * Add sub_tournament_images table.
 *
 * @param {Knex} knex
 */
export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TABLES.SUB_TOURNAMENT_IMAGES, (table: Knex.CreateTableBuilder) => {
    table.increments('id').primary();

    table
      .integer('sub_tournament_id')
      .notNullable()
      .references('id')
      .inTable(TABLES.TOURNAMENTS);
    table.text('image').notNullable();
    table.boolean('is_cover').defaultTo(false);
    table
      .integer('updated_by')
      .notNullable()
      .references('id')
      .inTable(TABLES.USER_ACCOUNTS);

    table.timestamps(true, true);
  });
}

/**
 * Drop sub_tournament_images table.
 *
 * @param {Knex} knex
 */
export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLES.SUB_TOURNAMENT_IMAGES);
}
