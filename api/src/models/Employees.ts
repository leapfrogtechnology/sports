import TABLES from '../constants/tables';

import BaseModel from './BaseModel';

class Employees extends BaseModel<Employees> {
  get tableName() {
    return TABLES.EMPLOYEES;
  }
}

export default Employees;
