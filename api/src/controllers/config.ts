import { Request, Response } from 'express';

import * as configService from '../services/config';

/**
 * Get app config values.
 *
 * @param req
 * @param res
 */
export async function getConfig(req: Request, res: Response) {
  const data = configService.getConfig();

  res.json(data);
}
