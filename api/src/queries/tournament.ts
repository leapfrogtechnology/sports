import HttpStatus from 'http-status-codes';
import { ApolloError } from 'apollo-server-core';

import Context from '../models/Context';
import Tournament from '../domains/tournament';
import { IDPayload } from '..//domains/general';
import * as tournamentServices from '../services/tournament';

/**
 * Query for fetching the list of all tournaments.
 *
 * @export
 * @param {*} parent
 * @param {Tournament} payload
 * @param {Context} context
 * @returns {Promise<object>}
 */
export function tournaments(parent: any, payload: Tournament, context: Context): Promise<object> {
  if (context.error) {
    throw new ApolloError(context.error, HttpStatus.FORBIDDEN.toString());
  }

  return tournamentServices.fetchAll();
}

export function tournament(parent: any, payload: IDPayload, context: Context): Promise<object> {
  if (context.error) {
    throw new ApolloError(context.error, HttpStatus.FORBIDDEN.toString());
  }

  return tournamentServices.fetchOne(payload.id);
}
