import HttpStatus from 'http-status-codes';
import { ApolloError } from 'apollo-server-express';

import Game from '../models/Game';
import Context from '../models/Context';
import { GamePayload } from '../domains/game';
import { IdPayload } from '../domains/general';
import * as gameServices from '../services/game';

/**
 * Mutation for creating a new game.
 *
 * @export
 * @param {*} parent
 * @param {GamePayload} payload
 * @param {Context} context
 * @returns {Promise<object>}
 */
export async function createGame(parent: any, payload: GamePayload, context: Context): Promise<object> {
  // Validate
  await validate(context, payload);

  const newGame = await gameServices.createGame(payload, context.user);

  return newGame;
}

/**
 * Mutation for editing an existing game by id.
 *
 * @export
 * @param {*} parent
 * @param {GamePayload} payload
 * @param {Context} context
 * @returns {Promise<object>}
 */
export async function editGame(parent: any, payload: GamePayload, context: Context): Promise<object> {
  const { id, name, shortName } = payload;

  if (!id) {
    throw new ApolloError(`Field "id" cannot be empty`, HttpStatus.FORBIDDEN.toString());
  }

  await validate(context, payload);

  const updateData = {
    name,
    shortName
  };

  const updatedGame = await gameServices.editGame(id, updateData, context.user);

  return updatedGame;
}

/**
 * Mutation to delete an existing game.
 *
 * @export
 * @param {*} parent
 * @param {IdPayload} payload
 * @param {Context} context
 * @returns {Promise<object>}
 */
export async function deleteGame(parent: any, payload: IdPayload, context: Context): Promise<object> {
  const { id } = payload;

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
 * Throws an error if any of the validation fails.
 *
 * @param {Context} context
 * @param {GamePayload} payload
 */
async function validate(context: Context, payload: GamePayload) {
  const { id = null, name, shortName } = payload;

  if (context.error) {
    throw new ApolloError(context.error, HttpStatus.FORBIDDEN.toString());
  }

  if (!name || !name.length) {
    throw new ApolloError(`Field "name" cannot be empty`, HttpStatus.BAD_REQUEST.toString());
  }

  if (!shortName || !shortName.length) {
    throw new ApolloError(`Field "shortName" cannot be empty`, HttpStatus.BAD_REQUEST.toString());
  }

  // Short name should be alphanumeric
  const pattern = /^[A-Za-z0-9-]*$/;

  if (!pattern.test(shortName)) {
    throw new ApolloError(
      `Field "shortName" should be a combination of alphanumeric and "-" only without any blank space`,
      HttpStatus.BAD_REQUEST.toString()
    );
  }

  // Check if the game already exists
  const existingGame = await new Game().where({ shortName }).fetch();

  if ((id && existingGame && existingGame.id !== id) || (!id && existingGame)) {
    throw new ApolloError('The game already exists', HttpStatus.BAD_REQUEST.toString());
  }
}
