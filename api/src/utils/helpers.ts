import * as dateFns from 'date-fns';

/**
 * Check if the value is alphanumeric only.
 *
 * @export
 * @param {string} value
 * @returns {boolean}
 */
export function isAlphanumeric(value: string): boolean {
  const pattern = /^[A-Za-z0-9-]*$/;

  return pattern.test(value);
}

/**
 * Get a formated date for any value.
 *
 * @export
 * @param {string} value
 * @returns {string}
 */
export function getFormattedDate(value: string): string {
  const d = new Date(value);

  return dateFns.format(d, 'yyyy-MM-dd');
}
