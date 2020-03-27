const bcrypt = require('bcrypt');
const PassportService = require('./service');
const PassportValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function register(req, res, next) {
  try {
    res.status(200).render('auth/register', { csrfToken: req.csrfToken() });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      details: null,
    });
    next(error);
  }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function auth(req, res, next) {
  try {
    res.status(200).render('auth/login', { csrfToken: req.csrfToken() });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      details: null,
    });
    next(error);
  }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function login(req, res, next) {
  try {
    const { error } = PassportValidation.login(req.body);

    if (error) {
      throw new ValidationError(error.details);
    }

    return res.status(200).redirect('/v1/users');
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({
        message: error.name,
        details: error.message,
      });
    }
    res.status(500).json({
      error: error.message,
      details: null,
    });
    return next(error);
  }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function createAdmin(req, res, next) {
  try {
    const { error } = PassportValidation.create(req.body);

    if (error) {
      throw new ValidationError(error.details);
    }
    const salt = bcrypt.genSaltSync(10);

    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    };

    await PassportService.create(user);
    req.flash('info', 'Admin user created');
    return res.status(201).redirect('/v1/auth/');
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({
        message: error.name,
        details: error.message,
      });
    }

    res.status(500).json({
      message: error.name,
      details: error.message,
    });

    return next(error);
  }
}

module.exports = {
  auth,
  register,
  login,
  createAdmin,
};
