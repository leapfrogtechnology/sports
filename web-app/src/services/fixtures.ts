import dateFns from 'date-fns';
import { some, find, isNull, sortBy, forEach, cloneDeep, isUndefined } from 'lodash';

import {
  TeamInterface,
  RoundInterface,
  FixtureInterface,
  RecentsInterface,
  CategoryInterface,
  TournamentDataInterface,
  TournamentDataResponseInterface
} from '../interfaces/interfaces';
import { checkIfPlayerIsInTeam } from './PlayerService';
import FIXTURE_STATUSES from '../constants/fixtureStatuses';

export function getFixtures(fixturesList: FixtureInterface[], limit: number = 0): FixtureInterface[] {
  let fixtures = fixturesList
    .filter(fixture => ['played', 'forfeited'].indexOf(fixture.status.toLowerCase()) < 0)
    .sort((a, b) => {
      return dateFns.compareAsc(a.date, b.date);
    });

  if (limit) {
    fixtures = fixtures.slice(0, limit);
  }

  return fixtures;
}

export function getResults(fixturesList: FixtureInterface[], limit: number = 0): FixtureInterface[] {
  let results = fixturesList
    .filter(fixture => ['played', 'forfeited'].indexOf(fixture.status.toLowerCase()) >= 0)
    .sort((a, b) => {
      return dateFns.compareDesc(a.date, b.date);
    });

  if (limit) {
    results = results.slice(0, limit);
  }

  return results;
}

export function getRecentFixtures(
  tournamentDetails: TournamentDataResponseInterface,
  limit: number = 2
): RecentsInterface {
  const today = new Date();
  const finishDate = new Date(tournamentDetails.details.finishDate);
  const recents: RecentsInterface = {
    results: [],
    fixtures: [],
    winners: [],
    showWinners: false
  };

  if (dateFns.isAfter(today, finishDate)) {
    recents.showWinners = true;
    recents.winners =
      tournamentDetails.details.winners && tournamentDetails.details.winners.length
        ? tournamentDetails.details.winners
        : [
          {
            category: '',
            winner: tournamentDetails.details.winner,
            runnerUp: tournamentDetails.details.runnerUp
          }
        ];
  } else {
    recents.results = getResults(tournamentDetails.fixtures, limit);
    recents.fixtures = getFixtures(tournamentDetails.fixtures, limit);
  }

  return recents;
}

export function getFixtureDate(fixture: FixtureInterface) {
  if (fixture.date) {
    return {
      date: dateFns.format(fixture.date, 'D MMM'),
      day: dateFns.format(fixture.date, 'dddd'),
      time: dateFns.format(fixture.date, 'h:mm A')
    };
  }

  return null;
}

/**
 * Get search results from a list of fixtures using keyword.
 *
 * @export
 * @param {FixtureInterface[]} allFixtures
 * @param {string} keyword
 * @returns {FixtureInterface[]}
 */
export function searchFixturesByKeyword(allFixtures: FixtureInterface[], keyword: string): FixtureInterface[] {
  let searchResults: FixtureInterface[] = [];
  keyword = keyword.trim().toLowerCase();

  searchResults = allFixtures.filter(fixture => {
    const homeTeamName = fixture.homeTeam.name.trim().toLowerCase();
    const awayTeamName = fixture.awayTeam.name.trim().toLowerCase();

    return (
      homeTeamName.indexOf(keyword) >= 0 ||
      awayTeamName.indexOf(keyword) >= 0 ||
      checkIfPlayerIsInTeam(fixture.homeTeam, keyword) ||
      checkIfPlayerIsInTeam(fixture.awayTeam, keyword)
    );
  });

  return searchResults;
}

/**
 * Fetch list of updated categories.
 *
 * @export
 * @param {CategoryInterface[]} [categories=[]]
 * @returns {CategoryInterface[]}
 */
export function getCategories(categories: CategoryInterface[] = []) {
  let categoriesList: CategoryInterface[] = categories;

  if (categories.length > 1) {
    const allCategory: CategoryInterface = { id: 0, description: 'All Categories' };

    categoriesList = [allCategory].concat(categories);
  }

  return categoriesList;
}

/**
 * Fetch list of updated rounds.
 *
 * @export
 * @param {RoundInterface[]} [rounds=[]]
 * @returns {RoundInterface[]}
 */
export function getRounds(rounds: RoundInterface[] = []) {
  let roundsList: RoundInterface[] = rounds;

  if (rounds.length > 1) {
    const allCategory: RoundInterface = {
      id: 0,
      description: 'All Rounds',
      sortOrder: 0,
      shortName: 'All'
    };

    roundsList = [allCategory].concat(rounds);
  }

  return roundsList;
}

/**
 * Get formatted tournament data.
 *
 * @export
 * @param {*} data
 * @param {number} [limit=0]
 * @returns {TournamentDataInterface}
 */
export function getSanitizedData(data: any, limit: number = 0): TournamentDataInterface {
  return {
    teams: data.teams,
    points: data.table || [],
    stats: data.stats || [],
    details: data.details,
    allFixtures: data.fixtures,
    statuses: data.statuses || [],
    results: getResults(data.fixtures),
    recents: getRecentFixtures(data, limit),
    fixtures: getFixtures(data.fixtures),
    rounds: getRounds(data.rounds) || [],
    categories: getCategories(data.categories) || []
  };
}

/**
 * Filter data by different params.
 *
 * @export
 * @param {*} data
 * @param {*} params
 * @returns {*}
 */
export function getFilteredData(data: any, params: any) {
  // Filter by category
  if (params.category && params.category.id >= 0) {
    const teams = filterTeamsByCategory(data.teams, params.category);
    const recents = filterRecentsByCategory(data.recents, params.category);
    const results = filterFixturesByCategory(data.results, params.category);
    const fixtures = filterFixturesByCategory(data.fixtures, params.category);
    const allFixtures = filterFixturesByCategory(data.allFixtures, params.category);

    return {
      teams,
      recents,
      results,
      fixtures,
      allFixtures
    };
  }

  return data;
}

/**
 * Check if fixture is played.
 *
 * @export
 * @param {FixtureInterface} fixture
 * @returns {boolean}
 */
export function isFixturePlayed(fixture: FixtureInterface) {
  return fixture.status.toLowerCase() === FIXTURE_STATUSES.PLAYED;
}

/**
 * Check if fixture is cancelled.
 *
 * @export
 * @param {FixtureInterface} fixture
 * @returns {boolean}
 */
export function isFixtureCancelled(fixture: FixtureInterface) {
  return fixture.status.toLowerCase() === 'cancelled';
}


/**
 * Sort fixtures by date.
 *
 * @export
 * @param {FixtureInterface[]} fixtures
 * @param {string} [order='ASC']
 * @returns {FixtureInterface[]}
 */
export function sortFixturesByDate(fixtures: FixtureInterface[], order: string = 'ASC'): FixtureInterface[] {
  const sortedFixtures = fixtures.sort((a, b) => {
    const dateA: any = new Date(a.date);
    const dateB: any = new Date(b.date);

    return dateA - dateB;
  });

  if (order.toLowerCase() === 'desc') {
    return sortedFixtures.reverse();
  }

  return sortedFixtures;
}

/**
 * Get list of rounds in fixtures.
 *
 * @export
 * @param {FixtureInterface[]} fixtures
 * @param {RoundInterface[]} rounds
 * @returns {RoundInterface[]}
 */
export function getFixturesRounds(fixtures: FixtureInterface[], rounds: RoundInterface[]): RoundInterface[] {
  const distinctRounds: RoundInterface[] = [];

  forEach(fixtures, fixture => {
    const round = findRoundByName(rounds, fixture.round);

    if (round && !some(distinctRounds, round)) {
      distinctRounds.push(round);
    }
  });

  if (distinctRounds.length > 1) {
    const allRound: RoundInterface = {
      id: 0,
      description: 'All Rounds',
      sortOrder: 0,
      shortName: 'All'
    };

    distinctRounds.push(allRound);
  }


  return sortBy(distinctRounds, ['sortOrder']);
}

/**
 * Filter fixtures by category.
 *
 * @export
 * @param {FixtureInterface[]} fixtures
 * @param {CategoryInterface} category
 * @returns {FixtureInterface[]}
 */
function filterFixturesByCategory(fixtures: FixtureInterface[], category: CategoryInterface) {
  if (category.id !== 0) {
    return fixtures.filter(fixture => fixture.categoryType.toLowerCase() === category.description.toLowerCase());
  }

  return fixtures;
}

/**
 * Filter teams by category.
 *
 * @export
 * @param {TeamInterface[]} teams
 * @param {CategoryInterface} category
 * @returns {TeamInterface[]}
 */
function filterTeamsByCategory(teams: TeamInterface[], category: CategoryInterface) {
  let teamsList = cloneDeep(teams);

  if (category && category.id !== 0) {
    teamsList = teams.filter(team => team.category.toLowerCase() === category.description.toLowerCase());
  }

  return sortBy(teamsList, ['category', 'name']);
}

/**
 * Fetch winners list by category.
 *
 * @param {any[]} winners
 * @param {CategoryInterface} category
 * @returns {*}
 */
function filterWinnersByCategory(winners: any[], category: CategoryInterface) {
  if (category && category.id !== 0) {
    return winners.filter(winner => winner.category.toLowerCase() === category.description.toLowerCase());
  }

  return winners;
}

/**
 * Filter recents info by category.
 *
 * @param {RecentsInterface} recents
 * @param {CategoryInterface} category
 * @returns {RecentsInterface}
 */
function filterRecentsByCategory(recents: RecentsInterface, category: CategoryInterface) {
  const updatedRecents = cloneDeep(recents);

  if (category && category.id !== 0) {
    updatedRecents.winners = filterWinnersByCategory(recents.winners, category);
    updatedRecents.results = filterFixturesByCategory(recents.results, category);
    updatedRecents.fixtures = filterFixturesByCategory(recents.fixtures, category);
  }

  return updatedRecents;
}

/**
 * Find round by name
 *
 * @param {RoundInterface[]} rounds
 * @param {string} roundName
 * @returns {(RoundInterface|null)}
 */
function findRoundByName(rounds: RoundInterface[], roundName: string): RoundInterface | null {
  return find(rounds, round => round.description === roundName) || null;
}
