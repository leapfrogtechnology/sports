import { Request, Response } from 'express';

import Employees from '../models/employees';

export async function getEmployees(req: Request, res: Response) {
  const employees = await Employees.scan().exec();

  res.json(employees);
}
