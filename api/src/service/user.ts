import bcrypt from 'bcrypt';
// import uuidv1 from 'uuid/v1';
// import Tokens from '../models/tokens';
import generateHash from '../utils/bcrypt';
import { createToken, createRefreshToken } from '../utils/jwt';
// import { TOKENIZATION_SUCCESSFUL, USER_NOT_FOUND, LOGIN_SUCCESSFUL, INVALID_PASSWORD } from '../constants/messages';

import UserNotFoundError from '../error/UserNotFoundError';
import EmployeeNotFoundError from '../error/EmployeeNotFoundError';
import InvalidPasswordError from '../error/InvalidPasswordError';
import { en } from '../lang/en';

import User from '../models/UserAccount';
import Employees from '../models/Employees';
import UserAccountTokens from '../models/UserAccountTokens';

/**
 * Get a user.
 *
 * @param  {Number|String}  id
 * @returns {Promise}
 */
// export function getUser(id: number) {
//   return getOne(id).then(user => {
//     if (!user) {
//       throw Boom.notFound(USER_NOT_FOUND);
//     }

//     return user;
//   });
// }

/**
 * Get a user from refreshToken.
 *
 * @param  {Object}  req
 * @returns {Promise}
 */
// export function getUserFromRefreshToken(req: any) {
//   return getuserFromToken(req.headers['refresh-token']);
// }

/**
 * Gets a employee from email.
 *
 * @param  {String}  email
 * @returns {Object}
 */
export async function getEmployeeFromEmail(email: string) {
  const employeeData = await new Employees().where({ email }).fetch();

  return employeeData.serialize();
}

/**
 * Gets a user from emp_id.
 *
 * @param  {String}  email
 * @returns {Object}
 */
export async function getUserFromId(id: number) {
  const userData = await new User().where({ employee_id: id }).fetch();

  return userData.serialize();
}

/**
 * Create new user.
 *
 * @param  {String}  password
 * @param  {String}  email
 * @returns {Promise}
 */
export async function createUser(password: string, email: string) {
  const hashedPassword = await generateHash(password);
  const employee = await getEmployeeFromEmail(email);

  return new User({
    password: hashedPassword,
    user_role_id: 3,
    employee_id: employee.ems_employee_id,
    created_at: new Date(),
    is_active: true
  }).save();
}

/**
 * Returns new access token.
 *
 * @param  {Object}  req
 * @returns {Promise}
 */
// export async function getUserToken(req) {
//   const user = await getUserFromRefreshToken(req);

//   const accessToken = generateJWT(user.attributes.userUUID, process.env.ACCESS_TOKEN_VALIDITY);

//   return new Promise(resolve => {
//     resolve({ accessToken, message: TOKENIZATION_SUCCESSFUL });
//   });
// }

/**
 * Login a  user.
 *
 * @param  {String}  password
 * @param  {String}  email
 * @returns {Promise}
 */
export function loginUser(password: string, email: string) {
  return new Promise(async (resolve, reject) => {
    const employee = await getEmployeeFromEmail(email);
    if (!employee) {
      throw new EmployeeNotFoundError(en.EmployeeNotFound);
    }
    const user = await getUserFromId(employee.ems_employee_id);

    if (!user) {
      throw new UserNotFoundError(en.USER_NOT_FOUND);
    }

    const accessToken = createToken({ email, password });
    const refreshToken = createRefreshToken({ email, password });

    bcrypt.compare(password, user.password, async (err, match) => {
      if (!match) {
        throw new InvalidPasswordError(en.INVALID_PASSWORD);
      }

      await new UserAccountTokens({
        user_account_id: user.id,
        refresh_token: refreshToken,
        created_at: new Date()
      }).save();

      resolve({ accessToken, refreshToken, message: en.LOGIN_SUCCESSFUL, status: 200 });
    });
  });
}
