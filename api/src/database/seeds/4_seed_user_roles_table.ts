import Knex from 'knex';

import TABLES from '../../constants/tables';
import USER_ROLES from '../../enums/userRoles';

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex(TABLES.USER_ROLES)
    .del()
    .then(() => {
      // Inserts seed entries
      return knex(TABLES.USER_ROLES).insert([
        { id: USER_ROLES.SUPER_ADMIN.id, name: USER_ROLES.SUPER_ADMIN.name },
        { id: USER_ROLES.ADMIN.id, name: USER_ROLES.ADMIN.name },
        { id: USER_ROLES.USER, name: USER_ROLES.USER.name }
      ]);
    });
}
