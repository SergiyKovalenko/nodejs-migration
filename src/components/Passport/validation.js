const Validation = require('../validation');

/**
 * @exports
 * @class
 * @extends Validation
 */
class PassportValidation extends Validation {
  /**
     * @param {String} data.email
     * @param {String} data.password
     * @param {String} data._csrf
     * @returns
     * @memberof PassportValidation
     */
  login(data) {
    return this.Joi
      .object({
        email: this.Joi.string().email(),
        password: this.Joi
          .string()
          .min(1)
          .max(30)
          .required(),
        _csrf: this.Joi
          .string()
          .required(),
      })
      .validate(data);
  }

  /**
     * @param {String} profile.email
     * @param {String} profile.fullName
     * @param {String} profile.password
     * @param {String} _csrf
     * @param {String} _method
     * @returns
     * @memberof PassportValidation
     */
  create(profile) {
    return this.Joi
      .object({
        email: this.Joi.string().email(),
        name: this.Joi
          .string()
          .min(1)
          .max(30)
          .required(),
        password: this.Joi
          .string()
          .min(1)
          .max(30)
          .required(),
        _csrf: this.Joi
          .string()
          .required(),
        _method: this.Joi
          .string(),
      })
      .validate(profile);
  }
}

module.exports = new PassportValidation();
