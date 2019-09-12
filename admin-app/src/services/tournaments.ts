import { IDInterface } from '../domains/General';
import * as httpHelper from '../utils/httpHelper';
import { TOURNAMENTS } from '../constants/queries';
import { TournamentPayloadInterface } from '../domains/models/Tournament';

/**
 * Fetch the list of all tournaments.
 *
 * @export
 * @returns {Promise<any>}
 */
export function fetchAll(): Promise<any> {
  const queryAPI = TOURNAMENTS.ALL;

  const query = `
    query {
      ${queryAPI} {
        id,
        name,
        season,
        startDate,
        finishDate,
        registrationFormUrl,
        game {
          id,
          name
        }
      }
    }
  `;

  return httpHelper.getResponse(queryAPI, query);
}

/**
 * Fetch a tournament details.
 *
 * @export
 * @returns {Promise<any>}
 */
export function fetchOne(payload: IDInterface): Promise<any> {
  const queryAPI = TOURNAMENTS.ONE;

  const query = `
    query {
      ${queryAPI} (id: ${payload.id}) {
        id,
        name,
        season,
        startDate,
        finishDate,
        registrationFormUrl,
        game {
          id,
          name
        }
      }
    }
  `;

  return httpHelper.getResponse(queryAPI, query);
}

/**
 * Create a new tournament.
 *
 * @export
 * @param {TournamentPayloadInterface} payload
 * @returns {Promise<any>}
 */
export function create(payload: TournamentPayloadInterface): Promise<any> {
  const queryAPI = TOURNAMENTS.CREATE;

  const mutation = `
    mutation {
      ${queryAPI} (
        name: "${payload.name}",
        gameId: ${payload.gameId},
        season: "${payload.season}",
        startDate: "${payload.startDate}",
        finishDate: "${payload.finishDate}",
        registrationFormUrl: "${payload.registrationFormUrl}",
      ) {
        id,
        name,
        season,
        startDate,
        finishDate,
        registrationFormUrl,
        game {
          id,
          name
        }
      }
    }
  `;

  return httpHelper.getResponse(queryAPI, mutation);
}

/**
 * Edit an existing tournament.
 *
 * @export
 * @param {TournamentPayloadInterface} payload
 * @returns {Promise<any>}
 */
export function edit(payload: TournamentPayloadInterface): Promise<any> {
  const queryAPI = TOURNAMENTS.EDIT;

  const mutation = `
    mutation {
      ${queryAPI} (
        id: ${payload.id},
        name: "${payload.name}",
        gameId: ${payload.gameId},
        season: "${payload.season}",
        startDate: "${payload.startDate}",
        finishDate: "${payload.finishDate}",
        registrationFormUrl: "${payload.registrationFormUrl}",
      ) {
        id,
        name,
        season,
        startDate,
        finishDate,
        registrationFormUrl,
        game {
          id,
          name
        }
      }
    }
  `;

  return httpHelper.getResponse(queryAPI, mutation);
}

/**
 * Delete an existing tournament.
 *
 * @export
 * @param {{ id: number }} payload
 * @returns {Promise<any>}
 */
export function remove(payload: IDInterface): Promise<any> {
  const queryAPI = TOURNAMENTS.DELETE;

  const mutation = `
    mutation {
      ${queryAPI} (id: ${payload.id}) {
        message
      }
    }
  `;

  return httpHelper.getResponse(queryAPI, mutation);
}
