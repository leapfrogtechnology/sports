import BaseModel from './BaseModel';
import TABLES from '../constants/tables';

class Game extends BaseModel<Game> {
  get tableName() {
    return TABLES.GAMES;
  }
}

export default Game;
