import jwt from 'jsonwebtoken';

export default class JWT {
  /**
   * @param {Object} payload payload that will be enconded within the token
   * @param {Number} exp time on seconds in which the token is valid
   * @returns {string} returns a jwt token
   */
  static sign(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: +process.env.JWT_EXP,
    });
  }

  /**
   * @param {string} token
   * @returns {Object} returns the payload if the token is valid, null otherwise
   */
  static verify(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return null;
    }
  }
}
