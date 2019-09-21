import * as HttpStatus from 'http-status-codes';
import { ApolloError } from 'apollo-server-core';

import knex from '../config/knex';
import TABLES from '../constants/tables';
import Tournament from '../models/Tournament';
import { LoggedInUser } from '../domains/user';
import { getFormattedDate } from '../utils/helpers';
import { TournamentPayload } from '../domains/tournament';
import GeneralResponse from '../domains/responses/general';

/**
 * Create a new tournament.
 *
 * @export
 * @param {TournamentPayload} payload
 * @param {LoggedInUser} loggedInUser
 * @returns {Promise<Tournament>}
 */
export async function create(payload: TournamentPayload, loggedInUser: LoggedInUser): Promise<Tournament> {
  const newTournament = await new Tournament({
    name: payload.name,
    gameId: payload.gameId,
    season: payload.season,
    startDate: getFormattedDate(payload.startDate),
    finishDate: (payload.finishDate && getFormattedDate(payload.finishDate)) || null,
    registrationFormUrl: payload.registrationFormUrl,
    updatedBy: loggedInUser.id
  }).save();

  const tournament = await fetchOne(newTournament.id);

  return tournament as any;
}

/**
 * Edit an existing tournament.
 *
 * @export
 * @param {number} id
 * @param {TournamentPayload} payload
 * @param {LoggedInUser} loggedInUser
 * @returns {Promise<Tournament>}
 */
export async function edit(id: number, payload: TournamentPayload, loggedInUser: LoggedInUser): Promise<Tournament> {
  // Check if the tournament exists
  const existingTournament = await new Tournament({ id }).fetch();

  if (!existingTournament) {
    throw new ApolloError(`Tournament does not exist`, HttpStatus.BAD_REQUEST.toString());
  }

  const updatedTournament = await existingTournament.save(
    {
      ...payload,
      startDate: getFormattedDate(payload.startDate),
      finishDate: (payload.finishDate && getFormattedDate(payload.finishDate)) || null,
      updatedBy: loggedInUser.id,
      updatedAt: new Date().toISOString()
    },
    {
      patch: true
    }
  );

  const tournament = await fetchOne(updatedTournament.id);

  return tournament as any;
}

/**
 * Delete an existing tournament.
 *
 * @export
 * @param {number} id
 * @returns {Promise<GeneralResponse>}
 */
export async function remove(id: number): Promise<GeneralResponse> {
  // Check if the tournament exists
  const tournament = await new Tournament({ id }).fetch();

  if (!tournament) {
    throw new ApolloError(`Tournament does not exist`, HttpStatus.BAD_REQUEST.toString());
  }

  // Delete the record from the database.
  await tournament.destroy();

  return {
    message: `Tournament successfully deleted`
  };
}

/**
 * Fetch list of all tournaments.
 *
 * @export
 * @returns {Promise<Tournament[]>}
 */
export async function fetchAll(): Promise<Tournament[]> {
  const query = getFetchQuery();
  const tournaments = await knex.raw(query);

  return getParsedData(tournaments.rows);
}

/**
 * Fetch details of a tournament by ID.
 *
 * @export
 * @param {number} id
 * @returns {Promise<object>}
 */
export async function fetchOne(id: number): Promise<object> {
  const query = getFetchQuery(id);
  const tournament = await knex.raw(query);
  const [row] = getParsedData(tournament.rows);

  return row;
}

/**
 * Get query to fetch tournament details.
 *
 * @param {(number | null)} [id=null]
 * @returns {string}
 */
function getFetchQuery(id: number | null = null): string {
  const whereCase = `WHERE t.id = ${id}`;

  const query = `
    SELECT t.id,
      t.name,
      t.season,
      t.start_date,
      t.finish_date,
      t.registration_form_url,
      json_build_object('id', g.id, 'name', g.name, 'short_name', g.short_name) as game
    FROM ${TABLES.TOURNAMENTS} t
      INNER JOIN ${TABLES.GAMES} g ON g.id = t.game_id
    ${!!id ? whereCase : ''}
    ORDER BY t.updated_at DESC
  `;

  return query;
}

/**
 * Get parsed data of the response.
 *
 * @param {any[]} tournaments
 * @returns {any[]}
 */
function getParsedData(tournaments: any[]): any[] {
  tournaments.map(tournament => {
    const { startDate, finishDate } = tournament;

    return {
      ...tournament,
      startDate: getFormattedDate(startDate),
      finishDate: finishDate && getFormattedDate(finishDate)
    };
  });

  return tournaments;
}
