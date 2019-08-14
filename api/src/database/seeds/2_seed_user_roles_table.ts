import Knex from 'knex';

import TABLES from '../../constants/tables';
import USER_ROLES from '../../enums/userRoles';

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex(TABLES.USER_ROLES)
    .del()
    .then(() => {
      // Inserts seed entries
      const data: any = [];
      const entries = Object.entries(USER_ROLES);

      entries.forEach(([key, value]) => {
        data.push(value);
      });

      return knex(TABLES.USER_ROLES).insert(data);
    });
}
