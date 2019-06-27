import TABLES from '../constants/tables';

import BaseModel from './BaseModel';

class UserAccountTokens extends BaseModel<UserAccountTokens> {
  get tableName() {
    return TABLES.USER_ACCOUNT_TOKENS;
  }
}

export default UserAccountTokens;
