import HttpStatus from 'http-status-codes';
import { ApolloError } from 'apollo-server-express';

import Status from '../models/Status';
import Context from '../models/Context';
import { IDPayload } from '../domains/general';
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

  return statusService.create(payload, context.user);
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

  return statusService.edit(id, updateData, context.user);
}

/**
 * Mutation to delete an existing status.
 *
 * @export
 * @param {*} parent
 * @param {IDPayload} payload
 * @param {Context} context
 * @returns {Promise<object>}
 */
export async function deleteStatus(parent: any, payload: IDPayload, context: Context): Promise<object> {
  const { id } = payload;

  if (context.error) {
    throw new ApolloError(context.error, context.error.code.toString());
  }

  if (!id) {
    throw new ApolloError(`Field "id" cannot be empty`, HttpStatus.FORBIDDEN.toString());
  }

  return statusService.remove(id);
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
    throw new ApolloError(context.error, context.error.code.toString());
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
