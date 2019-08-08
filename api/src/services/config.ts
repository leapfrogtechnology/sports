import ConfigResponse from '../domains/responses/config';

import USER_ROLES from '../constants/userRoles';
import CHESS_WINNING_METHODS from '../constants/chessWinningMethods';
import FOOTBALL_ACTIVITY_TYPES from '../constants/FootballActivityTypes';

/**
 * Get the list of config values.
 *
 * @returns ConfigResponse
 */
export function getConfig(): ConfigResponse {
  return {
    userRoles: USER_ROLES,
    chessWinningMethods: CHESS_WINNING_METHODS,
    footballActivityTypes: FOOTBALL_ACTIVITY_TYPES
  };
}
