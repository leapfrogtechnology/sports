import axios from 'axios';
import { chain, sortBy } from 'lodash';
import { differenceInDays, isAfter, isBefore } from 'date-fns';
import {
  SeasonInterface,
  TournamentInterface,
  SideBarTournamentInterface,
  RecentTournamentsInterface
} from '@/interfaces/interfaces';

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
