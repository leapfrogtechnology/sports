import BookShelf from '../config/bookshelf';

/**
 * Base bookshelf model that provides columns that is common in all tables used in app.
 * All bookshelf models should extend this class.
 */
abstract class BaseModel<T extends BaseModel<any>> extends BookShelf.Model<T> {
  timestamp() {
    return true;
  }

  softDelete() {
    return true;
  }
}

export default BaseModel;
