import BaseModel from './BaseModel';
import TABLES from '../constants/tables';

class UserAccount extends BaseModel<UserAccount> {
  get tableName() {
    return TABLES.USER_ACCOUNTS;
  }
}

export default UserAccount;
