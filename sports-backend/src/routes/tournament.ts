import { Router, Request, Response, NextFunction } from 'express';

import HTTP_STATUS_CONSTANTS from '../utils/http_status';

import validate from '../utils/validate';
import validationSchema from '../filters/tournament';
import * as TournamentController from '../controllers/tournament';

const router: Router = Router();

router.get('/', TournamentController.getTournaments);

router.post('/', TournamentController.addTournament);

export default router;