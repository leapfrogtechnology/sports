import { Router } from 'express';

import * as slackController from './controllers/slack';
import * as configController from './controllers/config';

const router = Router();

router.get('/', slackController.getEmployees);

router.get('/config', configController.getConfig);

export default router;
