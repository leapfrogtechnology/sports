import { TeamInterface } from '@/interfaces/interfaces';

/**
 * Check if a player is in the team.
 *
 * @export
 * @param {TeamInterface} team
 * @param {string} playerName
 * @returns {boolean}
 */
export function checkIfPlayerIsInTeam(team: TeamInterface, playerName: string): boolean {
  const players = team.players || [];

  return players.some(player => player.name.toLowerCase().indexOf(playerName.toLowerCase()) >= 0);
}
