import BaseModel from './BaseModel';
import TABLES from '../constants/tables';

class Tournament extends BaseModel<Tournament> {
  get tableName() {
    return TABLES.TOURNAMENTS;
  }
}

export default Tournament;
