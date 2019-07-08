import bcrypt from 'bcrypt';
import HttpStatus from 'http-status-codes';

import { en } from '../lang/en';
import { verify } from '../utils/jwt';
import { User } from '../domains/user';
import generateHash from '../utils/bcrypt';
import UserModel from '../models/UserAccount';
import EmployeeModel from '../models/Employee';
import { Employee } from '../domains/employee';
import { DEFAULT_USER_ROLE_ID } from '../constants/api';
import { generateAccessAndRefreshTokens } from './token';
import UserAccountTokens from '../models/UserAccountToken';

import NotFoundError from '../error/NotFoundError';
import JWTExpiredError from '../error/JWTExpiredError';
import InvalidPasswordError from '../error/InvalidPasswordError';

/**
 * Get a user from refreshToken.
 *
 * @param  {String}  token
 * @returns {Object}
 */
export async function getUserFromRefreshToken(refreshToken: string): Promise<User> {
  verify(refreshToken);

  const userTokenData = await new UserAccountTokens().where({ refresh_token: refreshToken }).fetch();
  if (!userTokenData) {
    throw new JWTExpiredError(en.TOKEN_EXPIRED, '', HttpStatus.UNAUTHORIZED);
  }

  const serializedTokenData = userTokenData.serialize();

  const user = await new UserModel().where({ id: serializedTokenData.user_account_id }).fetch();

  if (!user) {
    throw new NotFoundError(en.EmployeeNotFound);
  }

  return user.serialize();
}

/**
 * Gets a employee from email.
 *
 * @param  {String}  email
 * @returns {Object}
 */
export async function getEmployeeFromEmail(email: string): Promise<Employee> {
  const employee = await new EmployeeModel().where({ email }).fetch();
  if (!employee) {
    throw new NotFoundError(en.EmployeeNotFound);
  }

  return employee.serialize();
}

/**
 * Gets a user from emp_id.
 *
 * @param  {String}  email
 * @returns {Object}
 */
export async function getUserFromId(id: number): Promise<User> {
  const user = await new UserModel().where({ employee_id: id }).fetch();
  if (!user) {
    throw new NotFoundError(en.USER_NOT_FOUND);
  }

  return user.serialize();
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

  return new UserModel({
    password: hashedPassword,
    // by default when a user is created assign a 3(Normal USER) as the role
    user_role_id: DEFAULT_USER_ROLE_ID,
    ems_employee_id: employee.emsEmployeeId,
    created_at: new Date(),
    is_active: true
  }).save();
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
    try {
      const employee = await getEmployeeFromEmail(email);
      const user = await getUserFromId(employee.emsEmployeeId);

      // Comparing the password for verification
      bcrypt.compare(password, user.password, async (err, match) => {
        if (!match) {
          reject(new InvalidPasswordError(en.INVALID_PASSWORD));
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens({ user });

        resolve({ accessToken, refreshToken, message: en.LOGIN_SUCCESSFUL, status: HttpStatus.OK });
      });
    } catch (err) {
      reject(err);
    }
  });
}
