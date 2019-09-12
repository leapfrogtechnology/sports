// import * as dateFns from 'date-fns';
import HttpStatus from 'http-status-codes';
import { ApolloError } from 'apollo-server-express';

import Game from '../models/Game';
import Context from '../models/Context';
import Tournament from '../models/Tournament';
import { IDPayload } from '../domains/general';
import { isAlphanumeric } from '../utils/helpers';
import { TournamentPayload } from '../domains/tournament';
import * as tournamentService from '../services/tournament';

/**
 * Mutation for creating a new tournament.
 *
 * @export
 * @param {*} parent
 * @param {TournamentPayload} payload
 * @param {Context} context
 * @returns {Promise<object>}
 */
export async function createTournament(parent: any, payload: TournamentPayload, context: Context): Promise<object> {
  // Validate
  await validate(context, payload);

  return tournamentService.create(payload, context.user);
}

/**
 * Mutation for editing an existing tournament by id.
 *
 * @export
 * @param {*} parent
 * @param {TournamentPayload} payload
 * @param {Context} context
 * @returns {Promise<object>}
 */
export async function editTournament(parent: any, payload: TournamentPayload, context: Context): Promise<object> {
  const { id } = payload;

  if (!id) {
    throw new ApolloError(`Field "id" cannot be empty`, HttpStatus.FORBIDDEN.toString());
  }

  // Validate
  await validate(context, payload);

  return tournamentService.edit(id, payload, context.user);
}

/**
 * Mutation to delete an existing tournament.
 *
 * @export
 * @param {*} parent
 * @param {IDPayload} payload
 * @param {Context} context
 * @returns {Promise<object>}
 */
export async function deleteTournament(parent: any, payload: IDPayload, context: Context): Promise<object> {
  const { id } = payload;

  if (context.error) {
    throw new ApolloError(context.error, HttpStatus.FORBIDDEN.toString());
  }

  if (!id) {
    throw new ApolloError(`Field "id" cannot be empty`, HttpStatus.FORBIDDEN.toString());
  }

  return tournamentService.remove(id);
}

/**
 * Validate the payload.
 * Throws an error if any of the validation fails.
 *
 * @param {Context} context
 * @param {TournamentPayload} payload
 */
async function validate(context: Context, payload: TournamentPayload) {
  const { id = null, name, gameId, season, startDate, finishDate } = payload;

  if (context.error) {
    throw new ApolloError(context.error, HttpStatus.FORBIDDEN.toString());
  }

  if (!name || !name.length) {
    throw new ApolloError(`Field "name" cannot be empty`, HttpStatus.BAD_REQUEST.toString());
  }

  if (!season || !season.length) {
    throw new ApolloError(`Field "season" cannot be empty`, HttpStatus.BAD_REQUEST.toString());
  }

  if (!isAlphanumeric(season)) {
    throw new ApolloError(
      `Field "season" should be a combination of alphanumeric and "-" only without any blank space`,
      HttpStatus.BAD_REQUEST.toString()
    );
  }

  if (!startDate || !startDate.length) {
    throw new ApolloError(`Field "startDate" cannot be empty`, HttpStatus.BAD_REQUEST.toString());
  }

  const parsedStartDate = Date.parse(startDate);

  if (!parsedStartDate || isNaN(parsedStartDate)) {
    throw new ApolloError(`Field "startDate" is not a valid date`, HttpStatus.BAD_REQUEST.toString());
  }

  const parsedFinishedDate = finishDate && finishDate.length && Date.parse(finishDate);

  if (finishDate) {
    if (!parsedFinishedDate || isNaN(parsedFinishedDate)) {
      throw new ApolloError(`Field "finishDate" is not a valid date`, HttpStatus.BAD_REQUEST.toString());
    }

    // Finish date must be after or same as the startDate
    if (parsedFinishedDate < parsedStartDate) {
      throw new ApolloError(
        `"finishDate" must be greater than or equals to the "startDate"`,
        HttpStatus.BAD_REQUEST.toString()
      );
    }
  }

  if (!gameId) {
    throw new ApolloError(`Field "game" cannot be empty`, HttpStatus.BAD_REQUEST.toString());
  }

  // Check if the game exists
  const existingGame = await new Game().where({ id: gameId }).fetch();

  if (!existingGame) {
    throw new ApolloError(`Game not found`, HttpStatus.BAD_REQUEST.toString());
  }

  // Check if the tournament already exists
  const existingTournament = await new Tournament().where({ name, gameId }).fetch();

  if ((id && existingTournament && existingTournament.id !== id) || (!id && existingTournament)) {
    throw new ApolloError('The tournament already exists', HttpStatus.BAD_REQUEST.toString());
  }
}
