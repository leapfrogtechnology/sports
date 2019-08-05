import { Router } from 'express';

import * as slackController from './controllers/slack';

const router = Router();

router.get('/', slackController.getEmployees);

export default router;
