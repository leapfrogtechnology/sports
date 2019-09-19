import BaseModel from './BaseModel';
import TABLES from '../constants/tables';

class Status extends BaseModel<Status> {
  get tableName() {
    return TABLES.STATUSES;
  }
}

export default Status;
