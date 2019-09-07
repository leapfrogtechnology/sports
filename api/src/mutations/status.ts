import HttpStatus from 'http-status-codes';
import { ApolloError } from 'apollo-server-express';

import Status from '../models/Status';
import Context from '../models/Context';
import { IdPayload } from '../domains/general';
import { StatusPayload } from '../domains/status';
import * as statusService from '../services/status';

/**
 * Mutation for creating a new status.
 *
 * @export
 * @param {*} parent
 * @param {StatusPayload} payload
 * @param {Context} context
 * @returns {Promise<object>}
 */
export async function createStatus(parent: any, payload: StatusPayload, context: Context): Promise<object> {
  // Validate
  await validate(context, payload);

  const newCategory = await statusService.create(payload, context.user);

  return newCategory;
}

/**
 * Mutation for editing an existing status by id.
 *
 * @export
 * @param {*} parent
 * @param {StatusPayload} payload
 * @param {Context} context
 * @returns {Promise<object>}
 */
export async function editStatus(parent: any, payload: StatusPayload, context: Context): Promise<object> {
  const { id, name } = payload;

  if (!id) {
    throw new ApolloError(`Field "id" cannot be empty`, HttpStatus.FORBIDDEN.toString());
  }

  await validate(context, payload);

  const updateData = {
    name
  };

  const updatedGame = await statusService.edit(id, updateData, context.user);

  return updatedGame;
}

/**
 * Mutation to delete an existing status.
 *
 * @export
 * @param {*} parent
 * @param {IdPayload} payload
 * @param {Context} context
 * @returns {Promise<object>}
 */
export async function deleteStatus(parent: any, payload: IdPayload, context: Context): Promise<object> {
  const { id } = payload;

  if (context.error) {
    throw new ApolloError(context.error, HttpStatus.FORBIDDEN.toString());
  }

  if (!id) {
    throw new ApolloError(`Field "id" cannot be empty`, HttpStatus.FORBIDDEN.toString());
  }

  const deletedGame = await statusService.remove(id);

  return deletedGame;
}

/**
 * Validate the payload.
 * Throws an error if any of the validation fails.
 *
 * @param {Context} context
 * @param {StatusPayload} payload
 */
async function validate(context: Context, payload: StatusPayload) {
  if (context.error) {
    throw new ApolloError(context.error, HttpStatus.FORBIDDEN.toString());
  }

  const { id = null, name } = payload;

  if (!name || !name.length) {
    throw new ApolloError(`Field "name" cannot be empty`, HttpStatus.BAD_REQUEST.toString());
  }

  // Check if the game already exists with the given properties
  const existingStatus = await new Status().where({ name }).fetch();

  if ((id && existingStatus && existingStatus.id !== id) || (!id && existingStatus)) {
    throw new ApolloError('The status already exists', HttpStatus.BAD_REQUEST.toString());
  }
}
