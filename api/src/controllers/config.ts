import { Request, Response } from 'express';

import * as configService from '../services/config';

/**
 * Get app config values.
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 */
export async function getConfig(req: Request, res: Response) {
  const data = configService.getConfig();

  res.json(data);
}
