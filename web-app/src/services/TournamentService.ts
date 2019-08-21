import axios from 'axios';
import { sortBy } from 'lodash';
import { isAfter, isBefore, differenceInDays } from 'date-fns';
import { TournamentInterface, SeasonInterface, RecentTournamentsInterface } from '@/interfaces/interfaces';

/**
 * Fetch sport data for sport type and season.
 *
 * @export
 * @param {string} sport
 * @param {(string|number)} season
 * @returns {Promise<any>}
 */
export async function fetchSportData(sport: string, season: string | number): Promise<any> {
  let responseData = null;

  try {
    const apiUrl = getTournamentApiUrl(sport, season);

    if (apiUrl) {
      const response = await axios(apiUrl);

      if (response && response.data && response.data.status) {
        responseData = response.data;
      }
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

  let seasons: SeasonInterface[] = [];
  const today = new Date();

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
 * Get API URL for a specific tournament.
 *
 * @param {string} sport
 * @param {(string|number)} season
 * @returns {string | null}
 */
function getTournamentApiUrl(sport: string, season: string | number): string | null {
  if (!sport.length || !season.toString().length) {
    return null;
  }

  return `${process.env.VUE_APP_API_BASE_URL}/${sport}-${season}`;
}
