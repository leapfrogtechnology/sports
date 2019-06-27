import bcrypt from 'bcrypt';
import { reject } from 'bluebird';
const saltRounds = 10;

/**
 * Hashes and salts a password.
 *
 * @param  {string}   password
 * @returns {Promise}
 */
function generateHash(password: string) {
  return new Promise(resolve => {
    bcrypt.genSalt(saltRounds, (err: any, salt: string) => {
      if (err) {
        reject(err);
      }

      bcrypt.hash(password, salt, (err: any, hash: string) => {
        if (err) {
          reject(err);
        }

        resolve(hash);
      });
    });
  });
}

export default generateHash;
