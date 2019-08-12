import bcrypt from 'bcrypt';
import HttpStatus from 'http-status-codes';

import { en } from '../lang/en';
import { verify } from '../utils/jwt';
import { User } from '../domains/user';
import USER_ROLES from '../enums/userRoles';
import generateHash from '../utils/bcrypt';
import UserModel from '../models/UserAccount';
import EmployeeModel from '../models/Employee';
import { Employee } from '../domains/employee';
import { generateAccessAndRefreshTokens } from './token';
import UserAccountTokens from '../models/UserAccountToken';

import NotFoundError from '../error/NotFoundError';
import JWTExpiredError from '../error/JWTExpiredError';
import DuplicateEntryError from '../error/DuplicateEntryError';
import InvalidPasswordError from '../error/InvalidPasswordError';

/**
 * Returns a list of users.
 *
 * @returns {User[]}
 */
export async function fetchAllUsers(): Promise<User[]> {
  const users = await new UserModel().fetchAll();

  return users.serialize();
}

/**
 * Get a user from refreshToken.
 *
 * @param  {String}  token
 * @returns {Object}
 */
export async function getUserFromRefreshToken(refreshToken: string): Promise<User> {
  verify(refreshToken);

  const userTokenData = await new UserAccountTokens().where({ refreshToken }).fetch();

  if (!userTokenData) {
    throw new JWTExpiredError(en.TOKEN_EXPIRED, '', HttpStatus.UNAUTHORIZED);
  }

  const serializedTokenData = userTokenData.serialize();
  const user = await new UserModel().where({ id: serializedTokenData.userAccountId }).fetch();

  if (!user) {
    throw new NotFoundError(en.EMPLOYEE_NOT_FOUND);
  }

  return user.serialize();
}

/**
 * Gets a employee from email.
 *
 * @param  {String}  email
 * @returns {Object}
 * @throws {NotFoundError}
 */
export async function getEmployeeFromEmail(email: string): Promise<Employee> {
  const employee = await new EmployeeModel().where({ email }).fetch();

  if (!employee) {
    throw new NotFoundError(en.EMPLOYEE_NOT_FOUND);
  }

  return employee.serialize();
}

/**
 * Gets a user from emp_id.
 *
 * @param  {String}  email
 * @returns {Object}
 * @throws{NotFoundError}
 */
export async function getUserFromId(id: number): Promise<User> {
  const user = await new UserModel().where({ employeeId: id }).fetch();
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
 * @throws {DuplicateEntryError}
 */
export async function createUser(password: string, email: string) {
  const hashedPassword = await generateHash(password);
  const employee = await getEmployeeFromEmail(email);
  const users = await fetchAllUsers();
  const userEmployeeIdList = users.map(user => user.employeeId);

  if (userEmployeeIdList.includes(employee.emsEmployeeId)) {
    throw new DuplicateEntryError(en.EMAIL_ALREADY_TAKEN);
  }

  return new UserModel({
    password: hashedPassword,
    // By default when a user is created assign a 3(Normal USER) as the role
    userRoleId: USER_ROLES.USER.id,
    employeeId: employee.emsEmployeeId,
    createdAt: new Date(),
    isActive: true
  }).save();
}

/**
 * Login a  user.
 *
 * @param  {String}  password
 * @param  {String}  email
 * @returns {Promise}
 * @throws {InvalidPasswordError}
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
