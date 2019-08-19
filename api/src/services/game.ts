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
 * Fetch list of all games.
 *
 * @export
 * @returns
 */
export async function fetchAllGames() {
  const games = await new Game().fetchAll();

  return games.serialize();
}
