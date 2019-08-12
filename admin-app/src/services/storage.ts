const SESSION_KEY = 'userSession';

/**
 * Set user session to the storage.
 *
 * @export
 * @param {object} userSession
 */
export function setUserSession(userSession: object) {
  if (userSession) {
    const session = JSON.stringify(userSession);

    localStorage.setItem(SESSION_KEY, session);
  }
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
