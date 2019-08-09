import BaseModel from './BaseModel';
import TABLES from '../constants/tables';

class Employee extends BaseModel<Employee> {
  get tableName() {
    return TABLES.EMPLOYEES;
  }
}

export default Employee;
