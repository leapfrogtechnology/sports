import _ from 'lodash';

import { checkIfPlayerIsInTeam } from './PlayerService';
import { TeamInterface, FixtureInterface } from './../interfaces/interfaces';

/**
 * Get search results from a list of team using keyword.
 *
 * @export
 * @param {TeamInterface[]} allTeams
 * @param {string} keyword
 * @returns {TeamInterface[]}
 */
export function searchTeamsByKeyword(allTeams: TeamInterface[], keyword: string): TeamInterface[] {
  let teams: TeamInterface[] = [];

  teams = allTeams.filter(team => {
    return team.name.toLowerCase().indexOf(keyword.toLowerCase()) >= 0 || checkIfPlayerIsInTeam(team, keyword);
  });

  return teams;
}

/**
 * Check if the teams is set or to be decided.
 *
 * @export
 * @param {TeamInterface} team
 * @returns {boolean}
 */
export function isTeamTBD(team: TeamInterface): boolean {
  return !Object.keys(team).length;
}

/**
 * Get team information. If the team is not set, name the team as TBD.
 *
 * @export
 * @param {TeamInterface} team
 * @param parentFixtureId
 * @returns {TeamInterface}
 */
export function getTeamInfo(team: TeamInterface, parentFixtureId: number | null = null): TeamInterface {
  // Check if team is TBD. Set a default TBD team.
  if (isTeamTBD(team)) {
    let teamName = 'TBD';

    if (parentFixtureId) {
      teamName = `Winner of ${parentFixtureId}`;
    }

    return {
      id: 0,
      name: teamName,
      category: '',
      players: [
        {
          id: 0,
          name: teamName
        }
      ]
    };
  }

  return team;
}

/**
 * Check if a team contains two players.
 *
 * @export
 * @param {TeamInterface} team
 * @returns {boolean}
 */
export function isTeamDouble(team: TeamInterface): boolean {
  return !!(team && team.players && team.players.length === 2);
}

/**
 * Check if a team contains only one player.
 *
 * @export
 * @param {TeamInterface} team
 * @returns {boolean}
 */
export function isTeamSingle(team: TeamInterface): boolean {
  return !!(team && team.players && team.players.length === 1);
}

export function getTeamCustomStyles(team: TeamInterface): object {
  let customStyles = {};

  if (team.logo) {
    customStyles = Object.assign(customStyles, {
      color: team.logo.color,
      backgroundColor: team.logo.backgroundColor
    });
  }

  return customStyles;
}

/**
 * Get list of teams from list of fixtures.
 *
 * @export
 * @param {FixtureInterface[]} fixtures
 * @returns {TeamInterface[]}
 */
export function getTeamsFromFixtures(fixtures: FixtureInterface[]): TeamInterface[] {
  const homeTeams = _.chain(fixtures)
    .map(fixture => fixture.homeTeam)
    .value();

  const awayTeams = _.chain(fixtures)
    .map(fixture => fixture.awayTeam)
    .value();

  const bothTeams = homeTeams.concat(awayTeams);
  const teams = _.chain(bothTeams)
    .uniqBy('id')
    .sortBy('name')
    .value();

  teams.unshift({
    id: 0,
    name: 'All teams',
    category: ''
  });

  return teams;
}
