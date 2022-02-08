import bcrypt from 'bcryptjs';

export default class Password {
  /**
   * @param {string} password
   * @returns {Promise.<string>}
   */
  static async toHash(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
  /**
   * @param {string} password
   * @param {string} hashedPassword
   * @returns {Promise.<boolean>}
   */
  static compare(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }
}
