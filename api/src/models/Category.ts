import BaseModel from './BaseModel';
import TABLES from '../constants/tables';

class Category extends BaseModel<Category> {
  get tableName() {
    return TABLES.CATEGORIES;
  }
}

export default Category;
