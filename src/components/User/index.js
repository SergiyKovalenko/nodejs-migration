const UserService = require('./service');
const UserValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function findAll(req, res, next) {
  try {
    const users = await UserService.findAll();
    res.status(200).render('index', { allUsers: users, csrfToken: req.csrfToken() });
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
async function findById(req, res, next) {
  try {
    const { error } = UserValidation.findById(req.params);

    if (error) {
      throw new ValidationError(error.details);
    }

    const user = await UserService.findById(req.params.id);
    return res.status(200).render('users', { user, csrfToken: req.csrfToken() });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({
        error: error.name,
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

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function create(req, res, next) {
  try {
    const { error } = UserValidation.create(req.body);

    if (error) {
      throw new ValidationError(error.details);
    }

    await UserService.create(req.body);
    req.flash('info', 'User created');
    return res.status(200).redirect('/v1/users/');
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

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function updateById(req, res, next) {
  try {
    const dataValidation = { ...req.params, ...req.body };
    const { error } = UserValidation.updateById(dataValidation);
    if (error) {
      throw new ValidationError(error.details);
    }
    await UserService.updateById(req.params.id, req.body);
    req.flash('info', 'fullName updated');
    return res.status(200).redirect('/v1/users/');
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

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function deleteById(req, res, next) {
  try {
    const dataValidation = { ...req.params, ...req.body };
    const { error } = UserValidation.deleteById(dataValidation);

    if (error) {
      throw new ValidationError(error.details);
    }
    await UserService.deleteById(req.params.id);
    req.flash('info', 'User deleted');
    return res.status(200).redirect('/v1/users/');
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
  findAll,
  findById,
  create,
  updateById,
  deleteById,
};
