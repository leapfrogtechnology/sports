import BaseModel from './BaseModel';
import TABLES from '../constants/tables';

class UserAccountToken extends BaseModel<UserAccountToken> {
  get tableName() {
    return TABLES.USER_ACCOUNT_TOKENS;
  }
}

export default UserAccountToken;
