import * as HttpStatus from 'http-status-codes';
import { ApolloError } from 'apollo-server-core';

import Category from '../models/Category';
import { LoggedInUser } from '../domains/user';
import { CategoryPayload } from '../domains/category';
import GeneralResponse from '../domains/responses/general';

/**
 * Create a new category.
 *
 * @export
 * @param {CategoryPayload} payload
 * @param {LoggedInUser} loggedInUser
 * @returns {Promise<Category>}
 */
export async function create(payload: CategoryPayload, loggedInUser: LoggedInUser): Promise<Category> {
  const newCategory = await new Category({
    name: payload.name,
    updatedBy: loggedInUser.id
  }).save();

  return newCategory.serialize();
}

/**
 * Edit an existing category.
 *
 * @export
 * @param {number} id
 * @param {CategoryPayload} payload
 * @param {LoggedInUser} loggedInUser
 * @returns {Promise<Category>}
 */
export async function edit(id: number, payload: CategoryPayload, loggedInUser: LoggedInUser): Promise<Category> {
  // Check if the category exists
  const category = await new Category({ id }).fetch();

  if (!category) {
    throw new ApolloError(`Category does not exist`, HttpStatus.BAD_REQUEST.toString());
  }

  const updatedCategory = await category.save(
    {
      ...payload,
      updatedBy: loggedInUser.id,
      updatedAt: new Date().toISOString()
    },
    {
      patch: true
    }
  );

  return updatedCategory.serialize();
}

/**
 * Delete an existing category.
 *
 * @export
 * @param {number} id
 * @returns {Promise<GeneralResponse>}
 */
export async function remove(id: number): Promise<GeneralResponse> {
  // Check if the category exists
  const category = await new Category({ id }).fetch();

  if (!category) {
    throw new ApolloError(`Category does not exist`, HttpStatus.BAD_REQUEST.toString());
  }

  // Delete the record from the database.
  await category.destroy();

  return {
    message: `Category successfully deleted`
  };
}

/**
 * Fetch list of all categories.
 *
 * @export
 * @returns {Promise<Category[]>}
 */
export async function fetchAll(): Promise<Category[]> {
  const games = await new Category().fetchAll();

  return games.serialize();
}
