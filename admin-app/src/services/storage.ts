const SESSION_KEY = 'userSession';

/**
 * Set user session to the storage.
 *
 * @export
 * @param {object} userSession
 * @returns {boolean}
 */
export function setUserSession(userSession: object): boolean {
  if (!userSession) {
    return false;
  }

  const session = JSON.stringify(userSession);

  if (!session.length) {
    return false;
  }

  localStorage.setItem(SESSION_KEY, session);

  return true;
}

/**
 * Get user session from the storage.
 *
 * @export
 * @returns {(object | null)}
 */
export function getUserSession(): object | null {
  const session = localStorage.getItem(SESSION_KEY);

  if (!session) {
    return null;
  }

  const userSession = JSON.parse(session);

  return userSession;
}
