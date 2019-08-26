import * as HttpStatus from 'http-status-codes';
import { ApolloError } from 'apollo-server-core';

import Game from '../models/Game';

/**
 * Create a new game.
 *
 * @param payload
 */
export async function createGame(payload: { name: string; shortName: string }) {
  const newGame = await new Game({
    name: payload.name,
    shortName: payload.shortName.toLowerCase(),
    updatedBy: 3
  }).save();

  return newGame.serialize();
}

/**
 * Edit an existing game.
 *
 * @export
 * @param {number} id
 * @param {{ name: string; shortName: string }} payload
 * @returns {Promise<void>}
 */
export async function editGame(id: number, payload: { name: string; shortName: string }): Promise<void> {
  // Check if the game exists
  const game = await new Game({ id }).fetch();

  if (!game) {
    throw new ApolloError(`Game does not exist`, HttpStatus.BAD_REQUEST.toString());
  }

  const updatedGame = await game.save(
    {
      ...payload,
      updatedBy: 3,
      updatedAt: new Date().toISOString()
    },
    {
      patch: true
    }
  );

  return updatedGame.serialize();
}

/**
 * Fetch list of all games.
 *
 * @export
 * @returns
 */
export async function fetchAllGames() {
  const games = await new Game().fetchAll();

  return games.serialize();
}
