import { Router } from 'express';

import * as configController from './controllers/config';

const router = Router();

router.get('/', (req, res) => res.send('Hello World!'));

router.get('/config', configController.getConfig);

export default router;
