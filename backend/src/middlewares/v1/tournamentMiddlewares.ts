import { Router } from 'express';

const router: Router = Router();

import * as URLParamsValidator from '../../validators/paramsValidator';
import * as TournamentValidator from '../../validators/tournamentValidator';

router.get('/:id', URLParamsValidator.validateURLParams);
router.delete('/:id', URLParamsValidator.validateURLParams);
router.post('/', TournamentValidator.validateTournamentSchema);
router.put('/:id', URLParamsValidator.validateURLParams, TournamentValidator.validateTournamentSchema);

export default router;
