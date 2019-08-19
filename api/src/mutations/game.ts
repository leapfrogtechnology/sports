import HttpStatus from 'http-status-codes';
import { ApolloError } from 'apollo-server-express';

import Game from '../models/Game';
import Context from '../models/Context';
import * as gameServices from '../services/game';

/**
 * Mutation for creating a new game.
 *
 * @param {Object} parent
 * @param {Object} mutationParams
 * @param {Context} context
 * @returns {Object}
 * @throws {MissingUserNameOrPasswordError}
 */
export const createGame = async (
  parent: any,
  { name, shortName }: { name: string; shortName: string },
  context: Context
) => {
  if (!name || !name.length) {
    throw new ApolloError(`Field "name" cannot be empty`, HttpStatus.getStatusText(HttpStatus.BAD_REQUEST));
  }

  if (!shortName || !shortName.length) {
    throw new ApolloError(`Field "shortName" cannot be empty`, HttpStatus.getStatusText(HttpStatus.BAD_REQUEST));
  }

  // Check if the game already exists
  const existingGame = await new Game().where({ shortName }).fetch();

  if (existingGame) {
    throw new ApolloError('The game already exists', HttpStatus.getStatusText(HttpStatus.BAD_REQUEST));
  }

  const newGame = await gameServices.createGame({ name, shortName });

  return newGame;
};
