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
    updatedBy: 1
  }).save();

  return newGame.serialize();
}
