import * as HttpStatus from 'http-status-codes';
import { ApolloError } from 'apollo-server-core';

import Status from '../models/Status';
import { LoggedInUser } from '../domains/user';
import { StatusPayload } from '../domains/status';
import GeneralResponse from '../domains/responses/general';

/**
 * Create a new status.
 *
 * @export
 * @param {StatusPayload} payload
 * @param {LoggedInUser} loggedInUser
 * @returns {Promise<Status>}
 */
export async function create(payload: StatusPayload, loggedInUser: LoggedInUser): Promise<Status> {
  const newStatus = await new Status({
    name: payload.name,
    updatedBy: loggedInUser.id
  }).save();

  return newStatus.serialize();
}

/**
 * Edit an existing status.
 *
 * @export
 * @param {number} id
 * @param {StatusPayload} payload
 * @param {LoggedInUser} loggedInUser
 * @returns {Promise<Status>}
 */
export async function edit(id: number, payload: StatusPayload, loggedInUser: LoggedInUser): Promise<Status> {
  // Check if the status exists
  const round = await new Status({ id }).fetch();

  if (!round) {
    throw new ApolloError(`Status does not exist`, HttpStatus.BAD_REQUEST.toString());
  }

  const updatedStatus = await round.save(
    {
      ...payload,
      updatedBy: loggedInUser.id,
      updatedAt: new Date().toISOString()
    },
    {
      patch: true
    }
  );

  return updatedStatus.serialize();
}

/**
 * Delete an existing status.
 *
 * @export
 * @param {number} id
 * @returns {Promise<GeneralResponse>}
 */
export async function remove(id: number): Promise<GeneralResponse> {
  // Check if the status exists
  const round = await new Status({ id }).fetch();

  if (!round) {
    throw new ApolloError(`Status does not exist`, HttpStatus.BAD_REQUEST.toString());
  }

  // Delete the record from the database.
  await round.destroy();

  return {
    message: `Status successfully deleted`
  };
}

/**
 * Fetch list of all statuses.
 *
 * @export
 * @returns {Promise<Status[]>}
 */
export async function fetchAll(): Promise<Status[]> {
  const rounds = await new Status().orderBy('updated_at', 'DESC').fetchAll();

  return rounds.serialize();
}
