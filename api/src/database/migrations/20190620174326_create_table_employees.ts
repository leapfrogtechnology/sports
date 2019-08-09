import Knex from 'knex';

import TABLES from '../../constants/tables';

/**
 * Add employees table.
 *
 * @param {Knex} knex
 */
export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TABLES.EMPLOYEES, (table: Knex.CreateTableBuilder) => {
    table.increments('id').primary();

    table.string('first_name').notNullable();
    table.string('middle_name');
    table.string('last_name').notNullable();
    table
      .string('email')
      .notNullable()
      .unique();
    table.string('profile_picture_url');
    table.integer('ems_employee_id').notNullable();
    table.string('status').notNullable();

    table.timestamps(true, true);
  });
}

/**
 * Drop employees table.
 *
 * @param {Knex} knex
 */
export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLES.EMPLOYEES);
}
