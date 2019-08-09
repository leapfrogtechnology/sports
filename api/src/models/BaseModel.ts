import UserAccount from './UserAccount';
import BookShelf from '../config/bookshelf';

/**
 * Base bookshelf model that provides columns that is common in all tables used in app.
 * All bookshelf models should extend this class.
 */
abstract class BaseModel<T extends BaseModel<any>> extends BookShelf.Model<T> {
  createdBy(): UserAccount {
    return this.belongsTo(UserAccount);
  }

  updatedBy(): UserAccount {
    return this.belongsTo(UserAccount);
  }

  timestamp() {
    return true;
  }

  softDelete() {
    return true;
  }
}

export default BaseModel;
