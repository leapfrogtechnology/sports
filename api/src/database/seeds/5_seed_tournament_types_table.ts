import Knex from 'knex';

import TABLES from '../../constants/tables';
import TOURNAMENT_TYPES from '../../enums/tournamentTypes';

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex(TABLES.TOURNAMENT_TYPES)
    .del()
    .then(() => {
      // Inserts seed entries
      const data: any = [];
      const entries = Object.entries(TOURNAMENT_TYPES);

      entries.forEach(([key, value]) => {
        data.push(value);
      });

      return knex(TABLES.TOURNAMENT_TYPES).insert(data);
    });
}
