const UserService = require('./service');
const Validation = require('./validation');

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
    res.status(200).json(users);
  } catch (error) {
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
async function createUser(req, res, next) {
  try {
    await Validation.validateAsync(req.body);
    const users = await UserService.createUser(req);
    res.status(200).json(users);
  } catch (error) {
    res.send(error.message);
    next(error.message);
  }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function updateUsers(req, res, next) {
  try {
    const users = await UserService.updateUsers(req);
    res.status(200).json(users);
  } catch (error) {
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
async function deleteUser(req, res, next) {
  try {
    const users = await UserService.deleteUser(req);
    res.status(200).json(users);
  } catch (error) {
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
async function findUsers(req, res, next) {
  try {
    const users = await UserService.findUsers(req);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  findAll,
  createUser,
  updateUsers,
  deleteUser,
  findUsers,
};
