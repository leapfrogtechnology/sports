import * as HttpStatus from 'http-status-codes';
import { ApolloError } from 'apollo-server-core';

import Game from '../models/Game';
import { GamePayload } from '../domains/game';
import { LoggedInUser } from '../domains/user';
import GeneralResponse from '../domains/responses/general';

/**
 * Create a new game.
 *
 * @export
 * @param {GamePayload} payload
 * @param {LoggedInUser} loggedInUser
 * @returns {Promise<Game>}
 */
export async function createGame(payload: GamePayload, loggedInUser: LoggedInUser): Promise<Game> {
  const newGame = await new Game({
    name: payload.name,
    shortName: payload.shortName.toLowerCase(),
    updatedBy: loggedInUser.id
  }).save();

  return newGame.serialize();
}

/**
 * Edit an existing game.
 *
 * @export
 * @param {number} id
 * @param {GamePayload} payload
 * @param {LoggedInUser} loggedInUser
 * @returns {Promise<Game>}
 */
export async function editGame(id: number, payload: GamePayload, loggedInUser: LoggedInUser): Promise<Game> {
  // Check if the game exists
  const game = await new Game({ id }).fetch();

  if (!game) {
    throw new ApolloError(`Game does not exist`, HttpStatus.BAD_REQUEST.toString());
  }

  const updatedGame = await game.save(
    {
      ...payload,
      updatedBy: loggedInUser.id,
      updatedAt: new Date().toISOString()
    },
    {
      patch: true
    }
  );

  return updatedGame.serialize();
}

/**
 * Delete an existing game.
 *
 * @export
 * @param {number} id
 * @returns {Promise<GeneralResponse>}
 */
export async function deleteGame(id: number): Promise<GeneralResponse> {
  // Check if the game exists
  const game = await new Game({ id }).fetch();

  if (!game) {
    throw new ApolloError(`Game does not exist`, HttpStatus.BAD_REQUEST.toString());
  }

  // Delete the record from the database.
  await game.destroy();

  return {
    message: `Game successfully deleted`
  };
}

/**
 * Fetch list of all games.
 *
 * @export
 * @returns {Promise<Game[]>}
 */
export async function fetchAllGames(): Promise<Game[]> {
  const games = await new Game().fetchAll();

  return games.serialize();
}
