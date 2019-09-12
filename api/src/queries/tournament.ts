import Context from '../models/Context';
import Tournament from '../domains/tournament';
import { IDPayload } from '..//domains/general';
import { validateContext } from '../utils/validations';
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
  validateContext(context);

  return tournamentServices.fetchAll();
}

export function tournament(parent: any, payload: IDPayload, context: Context): Promise<object> {
  validateContext(context);

  return tournamentServices.fetchOne(payload.id);
}
