import Knex from 'knex';

import USER_ROLES from '../../enums/userRoles';
import TABLES from '../../constants/tables';

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex(TABLES.USER_ROLES)
    .del()
    .then(() => {
      // Inserts seed entries
      return knex(TABLES.USER_ROLES).insert([
        { id: USER_ROLES.SUPER_ADMIN, name: 'Super Admin' },
        { id: USER_ROLES.ADMIN, name: 'Admin' },
        { id: USER_ROLES.NORMAL, name: 'User' }
      ]);
    });
}
