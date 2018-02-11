import * as HttpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

import * as TournamentService from '../services/tournament';

/**
 * Get tournament by ID.
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function get(req: Request, res: Response, next: NextFunction) {
  try {
    const tournamentId = req.params.id;
    const tournament = await TournamentService.findById(tournamentId);

    res.status(HttpStatus.OK).json({
      data: tournament
    });
  } catch (error) {
    next();
  }
}

/**
 * Get list of all tournaments.
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const tournaments = await TournamentService.getAll();

    res.status(HttpStatus.OK).json({
      data: tournaments
    });
  } catch (error) {
    next();
  }
}

/**
 * Create a new tournament.
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const tournament = await TournamentService.create(req.body);

    res.status(HttpStatus.OK).json({
      data: tournament
    });
  } catch (error) {
    next();
  }
}
