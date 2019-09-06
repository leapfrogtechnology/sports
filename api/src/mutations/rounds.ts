import HttpStatus from 'http-status-codes';
import { ApolloError } from 'apollo-server-express';

import Round from '../models/Round';
import Context from '../models/Context';
import { IdPayload } from '../domains/general';
import { RoundPayload } from '../domains/round';
import * as roundService from '../services/round';

/**
 * Mutation for creating a new round.
 *
 * @export
 * @param {*} parent
 * @param {RoundPayload} payload
 * @param {Context} context
 * @returns {Promise<object>}
 */
export async function createRound(parent: any, payload: RoundPayload, context: Context): Promise<object> {
  // Validate
  await validate(context, payload);

  const newCategory = await roundService.create(payload, context.user);

  return newCategory;
}

/**
 * Mutation for editing an existing round by id.
 *
 * @export
 * @param {*} parent
 * @param {RoundPayload} payload
 * @param {Context} context
 * @returns {Promise<object>}
 */
export async function editRound(parent: any, payload: RoundPayload, context: Context): Promise<object> {
  const { id, name, shortName, sortOrder } = payload;

  if (!id) {
    throw new ApolloError(`Field "id" cannot be empty`, HttpStatus.FORBIDDEN.toString());
  }

  await validate(context, payload);

  const updateData = {
    name,
    shortName,
    sortOrder
  };

  const updatedGame = await roundService.edit(id, updateData, context.user);

  return updatedGame;
}

/**
 * Mutation to delete an existing round.
 *
 * @export
 * @param {*} parent
 * @param {IdPayload} payload
 * @param {Context} context
 * @returns {Promise<object>}
 */
export async function deleteRound(parent: any, payload: IdPayload, context: Context): Promise<object> {
  const { id } = payload;

  if (context.error) {
    throw new ApolloError(context.error, HttpStatus.FORBIDDEN.toString());
  }

  if (!id) {
    throw new ApolloError(`Field "id" cannot be empty`, HttpStatus.FORBIDDEN.toString());
  }

  const deletedGame = await roundService.remove(id);

  return deletedGame;
}

/**
 * Validate the payload.
 * Throws an error if any of the validation fails.
 *
 * @param {Context} context
 * @param {RoundPayload} payload
 */
async function validate(context: Context, payload: RoundPayload) {
  if (context.error) {
    throw new ApolloError(context.error, HttpStatus.FORBIDDEN.toString());
  }

  const { id = null, name, shortName, sortOrder } = payload;

  if (!name || !name.length) {
    throw new ApolloError(`Field "name" cannot be empty`, HttpStatus.BAD_REQUEST.toString());
  }

  if (!shortName || !shortName.length) {
    throw new ApolloError(`Field "shortName" cannot be empty`, HttpStatus.BAD_REQUEST.toString());
  }

  if (!sortOrder) {
    throw new ApolloError(`Field "sortOrder" cannot be empty`, HttpStatus.BAD_REQUEST.toString());
  }

  // Check if the game already exists with the given properties
  const existingRound = await new Round()
    .query(qb => {
      qb.where('name', name)
        .orWhere('shortName', shortName)
        .orWhere('sortOrder', sortOrder);
    })
    .fetch();

  if ((id && existingRound && existingRound.id !== id) || (!id && existingRound)) {
    throw new ApolloError('The round already exists', HttpStatus.BAD_REQUEST.toString());
  }
}
