import * as HttpStatus from 'http-status-codes';
import { ApolloError } from 'apollo-server-core';

import Round from '../models/Round';
import { LoggedInUser } from '../domains/user';
import { RoundPayload } from '../domains/round';
import GeneralResponse from '../domains/responses/general';

/**
 * Create a new round.
 *
 * @export
 * @param {RoundPayload} payload
 * @param {LoggedInUser} loggedInUser
 * @returns {Promise<Round>}
 */
export async function create(payload: RoundPayload, loggedInUser: LoggedInUser): Promise<Round> {
  const newRound = await new Round({
    name: payload.name,
    shortName: payload.shortName,
    sortOrder: payload.sortOrder,
    updatedBy: loggedInUser.id
  }).save();

  return newRound.serialize();
}

/**
 * Edit an existing round.
 *
 * @export
 * @param {number} id
 * @param {RoundPayload} payload
 * @param {LoggedInUser} loggedInUser
 * @returns {Promise<Round>}
 */
export async function edit(id: number, payload: RoundPayload, loggedInUser: LoggedInUser): Promise<Round> {
  // Check if the round exists
  const round = await new Round({ id }).fetch();

  if (!round) {
    throw new ApolloError(`Round does not exist`, HttpStatus.BAD_REQUEST.toString());
  }

  const updatedRound = await round.save(
    {
      ...payload,
      updatedBy: loggedInUser.id,
      updatedAt: new Date().toISOString()
    },
    {
      patch: true
    }
  );

  return updatedRound.serialize();
}

/**
 * Delete an existing round.
 *
 * @export
 * @param {number} id
 * @returns {Promise<GeneralResponse>}
 */
export async function remove(id: number): Promise<GeneralResponse> {
  // Check if the round exists
  const round = await new Round({ id }).fetch();

  if (!round) {
    throw new ApolloError(`Round does not exist`, HttpStatus.BAD_REQUEST.toString());
  }

  // Delete the record from the database.
  await round.destroy();

  return {
    message: `Round successfully deleted`
  };
}

/**
 * Fetch list of all rounds.
 *
 * @export
 * @returns {Promise<Round[]>}
 */
export async function fetchAll(): Promise<Round[]> {
  const rounds = await new Round().orderBy('sort_order', 'ASC').fetchAll();

  return rounds.serialize();
}
