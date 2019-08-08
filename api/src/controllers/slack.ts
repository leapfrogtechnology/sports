import { Request, Response } from 'express';

export async function getEmployees(req: Request, res: Response) {
  const data = {
    name: 'Sports API',
    test: true
  };

  res.json(data);
}
