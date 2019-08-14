import Knex from 'knex';

import TABLES from '../../constants/tables';
import FOOTBALL_ACTIVITY_TYPES from '../../enums/footballActivityTypes';

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex(TABLES.FOOTBALL_ACTIVITY_TYPES)
    .del()
    .then(() => {
      // Inserts seed entries
      const data: any = [];
      const entries = Object.entries(FOOTBALL_ACTIVITY_TYPES);

      entries.forEach(([key, value]) => {
        data.push(value);
      });

      return knex(TABLES.FOOTBALL_ACTIVITY_TYPES).insert(data);
    });
}
