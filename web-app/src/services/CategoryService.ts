import { CategoryInterface } from './../interfaces/interfaces';

/**
 * Get category by id.
 *
 * @export
 * @param {CategoryInterface[]} categories
 * @param {number} categoryId
 * @returns
 */
export function getCategoryById(categories: CategoryInterface[], categoryId: number) {
  return categories.find(cat => {
    return cat.id === categoryId;
  });
}
