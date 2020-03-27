const Validation = require('../validation');

/**
 * @exports
 * @class
 * @extends Validation
 */
class AuthValidation extends Validation {
  /**
     * @param {String} data.token - objectId
     * @returns
     * @memberof AuthValidation
     */
  getToken(data) {
    return this.Joi
      .object({
        token: this.Joi
          .string()
          .min(1)
          .required(),
      })
      .validate(data);
  }

  /**
     * @param {String} data.fullName - objectId
     * @returns
     * @memberof AuthValidation
     */
  getUser(data) {
    return this.Joi
      .object({
        fullName: this.Joi
          .string()
          .min(1)
          .max(30)
          .required(),
      })
      .validate(data);
  }

  /**
     * @param {String} profile.fullName
     * @returns
     * @memberof AuthValidation
     */
  loginJwt(profile) {
    return this.Joi
      .object({
        fullName: this.Joi
          .string()
          .min(1)
          .max(30)
          .required(),
      })
      .validate(profile);
  }
}

module.exports = new AuthValidation();
