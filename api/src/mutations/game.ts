import HttpStatus from 'http-status-codes';
import { ApolloError } from 'apollo-server-express';

import Game from '../models/Game';
import Context from '../models/Context';
import * as gameServices from '../services/game';

/**
 * Mutation for creating a new game.
 *
 * @export
 * @param {*} parent
 * @param {{ name: string; shortName: string }} { name, shortName }
 * @param {Context} context
 * @returns
 */
export async function createGame(
  parent: any,
  { name, shortName }: { name: string; shortName: string },
  context: Context
) {
  // Validate
  await validate(context, name, shortName);

  const newGame = await gameServices.createGame({ name, shortName });

  return newGame;
}

/**
 * Mutation for editing an existing game by id.
 *
 * @export
 * @param {*} parent
 * @param {{ id: number; name: string; shortName: string }} { id, name, shortName }
 * @param {Context} context
 * @returns {object}
 * @throws ApolloError
 */
export async function editGame(
  parent: any,
  { id, name, shortName }: { id: number; name: string; shortName: string },
  context: Context
) {
  if (!id) {
    throw new ApolloError(`Field "id" cannot be empty`, HttpStatus.FORBIDDEN.toString());
  }

  await validate(context, name, shortName);

  const payload = {
    name,
    shortName
  };

  const updatedGame = await gameServices.editGame(id, payload);

  return updatedGame;
}

/**
 * Mutation to delete an existing game.
 *
 * @export
 * @param {*} parent
 * @param {{ id: number; }} { id }
 * @param {Context} context
 * @returns
 * @throws ApolloError
 */
export async function deleteGame(parent: any, { id }: { id: number }, context: Context) {
  if (context.error) {
    throw new ApolloError(context.error, HttpStatus.FORBIDDEN.toString());
  }

  if (!id) {
    throw new ApolloError(`Field "id" cannot be empty`, HttpStatus.FORBIDDEN.toString());
  }

  const deletedGame = await gameServices.deleteGame(id);

  return deletedGame;
}

/**
 * Validate the payload.
 * Throw an error if any of the validation fails.
 *
 * @param {Context} context
 * @param {string} name
 * @param {string} shortName
 */
async function validate(context: Context, name: string, shortName: string) {
  if (context.error) {
    throw new ApolloError(context.error, HttpStatus.FORBIDDEN.toString());
  }

  if (!name || !name.length) {
    throw new ApolloError(`Field "name" cannot be empty`, HttpStatus.BAD_REQUEST.toString());
  }

  if (!shortName || !shortName.length) {
    throw new ApolloError(`Field "shortName" cannot be empty`, HttpStatus.BAD_REQUEST.toString());
  }

  // Check if the game already exists
  const existingGame = await new Game().where({ shortName }).fetch();

  if (existingGame) {
    throw new ApolloError('The game already exists', HttpStatus.BAD_REQUEST.toString());
  }
}
