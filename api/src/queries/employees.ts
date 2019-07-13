import Context from '../models/Context';
import Employee from '../models/Employee';

/**
 * Returns all the employees
 *
 * @param parent: The object that contains the result returned from the resolver on the parent field
 * @param args:  An object with the arguments passed into the field in the query
 * @param context: This is an object shared by all resolvers in a particular query
 * @returns {Array}
 */
export async function employees(parent: any, args: any, context: Context) {
  const employeeList = await new Employee().fetchAll();

  return employeeList.serialize();
}

/**
 * Returns the employee given the employee id.
 *
 * @param parent: The object that contains the result returned from the resolver on the parent field
 * @param args:  An object with the arguments passed into the field in the query
 * @param context: This is an object shared by all resolvers in a particular query
 * @returns {object}
 */
export async function employee(parent: any, args: any, context: Context) {
  const { id } = args;

  if (!id) {
    return null;
  }

  const user = await new Employee().where({ id }).fetch();

  return user.serialize();
}
