import BaseModel from './BaseModel';
import TABLES from '../constants/tables';

class Round extends BaseModel<Round> {
  get tableName() {
    return TABLES.ROUNDS;
  }
}

export default Round;
