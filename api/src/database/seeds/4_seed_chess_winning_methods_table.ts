import Knex from 'knex';

import TABLES from '../../constants/tables';
import CHESS_WINNING_METHODS from '../../enums/chessWinningMethods';

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex(TABLES.CHESS_WINNING_METHODS)
    .del()
    .then(() => {
      // Inserts seed entries
      const data: any = [];
      const entries = Object.entries(CHESS_WINNING_METHODS);

      entries.forEach(([key, value]) => {
        data.push(value);
      });

      return knex(TABLES.CHESS_WINNING_METHODS).insert(data);
    });
}
