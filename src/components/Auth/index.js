const jwt = require('jsonwebtoken');
const UserService = require('../User/service');
const AuthService = require('./service');
const AuthValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');

require('dotenv').config();

// Generate Access Token function
function generateAccessToken(payload) {
  return jwt.sign({ payload }, 'process.env.ACCESS_TOKEN', { expiresIn: '5m' });
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function getUser(req, res, next) {
  try {
    const { error } = AuthValidation.getUser(req.user);

    if (error) {
      throw new ValidationError(error.details);
    }
    const users = await UserService.findAll();
    return res.json(users.filter((user) => user.fullName === req.user.fullName));
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({
        error: error.name,
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
async function loginJwt(req, res, next) {
  try {
    const { error } = AuthValidation.loginJwt(req.body);

    if (error) {
      throw new ValidationError(error.details);
    }
    const { fullName } = req.body;

    const payload = { fullName };

    const accessToken = generateAccessToken(payload);

    const refreshToken = jwt.sign({ payload }, 'process.env.REFRESH_TOKEN', { expiresIn: '1d' });

    const countRecords = await AuthService.countRecords();

    AuthService.create({ refreshToken, date: Date() });
    if (countRecords > 4) {
      const lastRecord = await AuthService.findLast();

      AuthService.deleteById(lastRecord[0]._id);
    }
    return res.json({ accessToken, refreshToken });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({
        error: error.name,
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
async function getToken(req, res, next) {
  try {
    const { error } = AuthValidation.getToken(req.body);

    if (error) {
      throw new ValidationError(error.details);
    }
    const refreshToken = req.body.token;

    const result = await AuthService.findByToken(refreshToken);

    if (refreshToken == null) return res.sendStatus(401);
    if (result[0] === undefined) return res.sendStatus(403);
    jwt.verify(refreshToken, 'process.env.REFRESH_TOKEN', (err, decoded) => {
      if (err) return res.sendStatus(403);
      const accessToken = generateAccessToken({ fullName: decoded.payload.fullName });

      return res.json({ accessToken });
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({
        error: error.name,
        details: error.message,
      });
    }

    res.status(500).json({
      error: error.message,
      details: null,
    });
    next(error);
  }
  return true;
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function logout(req, res, next) {
  try {
    const { error } = AuthValidation.getToken(req.body);

    if (error) {
      throw new ValidationError(error.details);
    }
    const refreshToken = req.body.token;

    const result = await AuthService.findByToken(refreshToken);

    if (refreshToken == null) return res.sendStatus(401);
    if (result[0] === undefined) return res.sendStatus(403);
    if (result[0]._id) {
      AuthService.deleteById(result[0]._id);
      return res.sendStatus(204);
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({
        error: error.name,
        details: error.message,
      });
    }

    res.status(500).json({
      error: error.message,
      details: null,
    });
    next(error);
  }
  return true;
}

module.exports = {
  getUser,
  loginJwt,
  getToken,
  logout,
};
