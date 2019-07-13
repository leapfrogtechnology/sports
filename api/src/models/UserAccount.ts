import TABLES from '../constants/tables';

import BookShelf from '../config/bookshelf';

class UserAccount extends BookShelf.Model<UserAccount> {
  get tableName() {
    return TABLES.USER_ACCOUNTS;
  }
}

export default UserAccount;
