import bcrypt from 'bcrypt';

const saltRounds = 10;

/**
 * Hashes and salts a password.
 *
 * @param  {string}   password
 * @returns {Promise}
 */
function generateHash(password: string) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (error: any, salt: string) => {
      if (error) {
        reject(error);
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
