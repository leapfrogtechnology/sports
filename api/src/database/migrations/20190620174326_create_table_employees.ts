import Knex from 'knex';

import TABLES from '../../constants/tables';

/**
 * Add employees table.
 *
 * @param {Knex} knex
 */
export function up(knex: Knex) {
  return knex.schema.createTable(TABLES.EMPLOYEES, (table: Knex.CreateTableBuilder) => {
    table.increments('id').primary();

    table.string('first_name').notNullable();
    table.string('middle_name');
    table.string('last_name').notNullable();
    table.string('email').notNullable();
    table.string('profile_picture_url');
    table.integer('ems_employee_id').notNullable();

    table.timestamps(true, true);
  });
}

/**
 * Drop employees table.
 *
 * @param {Knex} knex
 */
export function down(knex: Knex) {
  return knex.schema.dropTable(TABLES.EMPLOYEES);
}
