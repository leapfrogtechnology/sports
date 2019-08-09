import Knex from 'knex';

import TABLES from '../../constants/tables';

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex(TABLES.EMPLOYEES)
    .del()
    .then(() => {
      // Inserts seed entries
      return knex(TABLES.EMPLOYEES).insert([
        {
          id: 1,
          first_name: 'Super',
          middle_name: '',
          last_name: 'Admin',
          email: 'admin@sports.com',
          profile_picture_url: '',
          ems_employee_id: 0,
          status: 'Permanent'
        }
      ]);
    });
}
