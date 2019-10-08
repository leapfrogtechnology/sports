import axios from 'axios';
import { chain, sortBy } from 'lodash';
import { differenceInDays, isAfter, isBefore, compareDesc, compareAsc } from 'date-fns';
import {
  RoundInterface,
  SeasonInterface,
  RecentsInterface,
  FixtureInterface,
  CategoryInterface,
  TournamentInterface,
  TournamentDataInterface,
  SideBarTournamentInterface,
  RecentTournamentsInterface,
  TournamentDataResponseInterface
} from '@/interfaces/interfaces';

/**
 * Fetch a tournament data by game and season.
 * For e.g. futsal-2019
 *
 * @export
 * @param {string} game
 * @param {string} season
 * @returns {Promise<any>}
 */
export async function fetchTournament(game: string, season: string): Promise<any> {
  let responseData = null;

  try {
    const apiUrl = `${process.env.VUE_APP_API_BASE_URL}/${game}-${season}`;
    const response = await axios(apiUrl);

    if (response && response.data && response.data.status) {
      responseData = response.data.data;
    }
  } catch (e) {
    responseData = null;
  }

  return responseData;
}

/**
 * Fetch list of tournaments.
 *
 * @export
 * @returns {Promise<any>}
 */
export async function fetchTournamentsList(): Promise<any> {
  let responseData = null;

  try {
    const apiUrl = `${process.env.VUE_APP_API_BASE_URL}/tournaments`;
    const response = await axios(apiUrl);

    if (response && response.data && response.data.status) {
      responseData = response.data.data;
    }
  } catch (e) {
    responseData = null;
  }

  return responseData;
}

/**
 * Fetch list of recent tournaments.
 *
 * @export
 * @param {Tournament[]} tournaments
 * @returns {object}
 */
export function getRecentTournaments(tournaments: TournamentInterface[]): RecentTournamentsInterface {
  const recentTournaments: RecentTournamentsInterface = {
    current: [],
    upcoming: [],
    past: []
  };

  const seasons = getAllSeasons(tournaments);
  const today = new Date();

  seasons.forEach(season => {
    // Currently running
    if (!season.endDate && isAfter(today, new Date(season.startDate))) {
      recentTournaments.current.push(season);
    } else if (!season.endDate && season.startDate && isBefore(today, new Date(season.startDate))) {
      // Upcoming
      recentTournaments.upcoming.push(season);
    } else if (season.endDate && isAfter(today, new Date(season.endDate))) {
      // Past
      recentTournaments.past.push(season);
    }
  });

  recentTournaments.current = sortBy(recentTournaments.current, 'startDate');
  recentTournaments.upcoming = sortBy(recentTournaments.upcoming, 'startDate');

  return recentTournaments;
}

/**
 * Get list of tournaments for the sidebar.
 *
 * @export
 * @param {TournamentInterface[]} tournaments
 * @returns {SideBarTournamentInterface[]}
 */
export function getTournamentsListForSideBar(tournaments: TournamentInterface[]): SideBarTournamentInterface[] {
  const allSeasons = getAllSeasons(tournaments);

  const competitions = chain(allSeasons)
    .groupBy('parentTournament.shortName')
    .toArray()
    .value();

  const data = competitions.map((t: any) => {
    const seasons = t.map((s: any) => {
      const link = s.shortName && s.shortName.length ? s.shortName : s.season;

      return {
        name: s.season,
        route: `/${s.parentTournament.shortName}/${link}`
      };
    });

    const tournament = t[0].parentTournament;

    const icon = getTournamentIcon(tournament.shortName);

    return {
      icon,
      seasons,
      name: tournament.name
    };
  });

  return data;
}

/**
 * Get formatted tournament data.
 *
 * @export
 * @param {*} data
 * @param {number} [limit=0]
 * @returns {TournamentDataInterface}
 */
export function getSanitizedTournamentData(data: any, limit: number = 0): TournamentDataInterface {
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
 * Get the icon for a tournament.
 *
 * @export
 * @param {string} name
 * @returns {string}
 */
export function getTournamentIcon(name: string): string {
  let icon = '';

  switch (name) {
    case 'futsal':
      icon = 'far fa-futbol';
      break;
    case 'carrom-board':
      icon = 'fas fa-vector-square';
      break;
    case 'table-tennis':
      icon = 'fas fa-table-tennis';
      break;
    case 'chess':
      icon = 'fas fa-chess';
      break;
    default:
      icon = 'fas fa-gamepad';
      break;
  }

  return icon;
}

/**
 * Get list of all tournaments.
 *
 * @param {TournamentInterface[]} tournaments
 * @returns {SeasonInterface[]}
 */
function getAllSeasons(tournaments: TournamentInterface[]): SeasonInterface[] {
  let seasons: SeasonInterface[] = [];

  tournaments.forEach(tournament => {
    tournament.seasons.forEach(season => {
      season.parentTournament = {
        id: tournament.id,
        name: tournament.name,
        shortName: tournament.shortName
      };
    });

    seasons = seasons.concat(tournament.seasons);
  });

  seasons.sort((a, b) => differenceInDays(new Date(a.startDate), new Date(b.startDate))).reverse();

  return seasons;
}

/**
 * Get non-played fixtures of a tournament.
 *
 * @export
 * @param {FixtureInterface[]} fixturesList
 * @param {number} [limit=0]
 * @returns {FixtureInterface[]}
 */
function getFixtures(fixturesList: FixtureInterface[], limit: number = 0): FixtureInterface[] {
  let fixtures = fixturesList
    .filter(fixture => ['played', 'forfeited'].indexOf(fixture.status.toLowerCase()) < 0)
    .sort((a, b) => {
      return compareAsc(a.date, b.date);
    });

  if (limit) {
    fixtures = fixtures.slice(0, limit);
  }

  return fixtures;
}

/**
 * Get played fixtures of a tournament.
 *
 * @param {FixtureInterface[]} fixturesList
 * @param {number} [limit=0]
 * @returns {FixtureInterface[]}
 */
function getResults(fixturesList: FixtureInterface[], limit: number = 0): FixtureInterface[] {
  let results = fixturesList
    .filter(fixture => ['played', 'forfeited'].indexOf(fixture.status.toLowerCase()) >= 0)
    .sort((a, b) => {
      return compareDesc(a.date, b.date);
    });

  if (limit) {
    results = results.slice(0, limit);
  }

  return results;
}

/**
 * Get a list of recent fixtures of a tournament.
 *
 * @param {TournamentDataResponseInterface} tournamentDetails
 * @param {number} [limit=2]
 * @returns {RecentsInterface}
 */
function getRecentFixtures(tournamentDetails: TournamentDataResponseInterface, limit: number = 2): RecentsInterface {
  const today = new Date();
  const finishDate = new Date(tournamentDetails.details.finishDate);
  const recents: RecentsInterface = {
    results: [],
    fixtures: [],
    winners: [],
    showWinners: false
  };

  if (isAfter(today, finishDate)) {
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
