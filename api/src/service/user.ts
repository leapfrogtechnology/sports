import bcrypt from 'bcrypt';
// import uuidv1 from 'uuid/v1';
// import Tokens from '../models/tokens';
import HttpStatus from 'http-status-codes';

import { verify } from '../utils/jwt';
import generateHash from '../utils/bcrypt';
import { generateAccessAndRefreshTokens, generateAccessToken } from './token';

import UserNotFoundError from '../error/UserNotFoundError';
import EmployeeNotFoundError from '../error/EmployeeNotFoundError';
import InvalidPasswordError from '../error/InvalidPasswordError';
import { en } from '../lang/en';

import User from '../models/UserAccount';
import Employees from '../models/Employees';
import UserAccountTokens from '../models/UserAccountTokens';

/**
 * Get a user from refreshToken.
 *
 * @param  {String}  token
 * @returns {Object}
 */
export async function getUserFromRefreshToken(refreshToken: any) {
  verify(refreshToken);

  const userTokenData = await new UserAccountTokens().where({ refresh_token: refreshToken }).fetch();
  if (!userTokenData) {
    throw new Error('refreshToken not present ');
  }

  const serializedTokenData = userTokenData.serialize();

  const user = await new User().where({ id: serializedTokenData.user_account_id }).fetch();

  if (!user) {
    throw new EmployeeNotFoundError(en.EmployeeNotFound);
  }

  return user.serialize();
}

/**
 * Gets a employee from email.
 *
 * @param  {String}  email
 * @returns {Object}
 */
export async function getEmployeeFromEmail(email: string) {
  const employee = await new Employees().where({ email }).fetch();

  if (!employee) {
    throw new EmployeeNotFoundError(en.EmployeeNotFound);
  }

  return employee.serialize();
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
    // by default when a user is created assign a 3(Normal USER) as the role
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
export async function getNewAccessToken(refreshToken: string): Promise<any> {
  const user = await getUserFromRefreshToken(refreshToken);

  const accessToken = generateAccessToken({ user });

  return new Promise(resolve => {
    resolve({ accessToken, message: en.TOKENIZATION_SUCCESSFUL });
  });
}

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

    // comparing the password for verification
    bcrypt.compare(password, user.password, async (err, match) => {
      if (!match) {
        throw new InvalidPasswordError(en.INVALID_PASSWORD);
      }

      const { accessToken, refreshToken } = await generateAccessAndRefreshTokens({ email, user });

      resolve({ accessToken, refreshToken, message: en.LOGIN_SUCCESSFUL, status: HttpStatus.OK });
    });
  });
}
