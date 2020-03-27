const AuthModel = require('./model');

/**
 * @exports
 * @method findByToken
 * @param {string} refreshToken
 * @summary get a record
 * @returns {Promise<AuthModel>}
 */
function findByToken(refreshToken) {
  return AuthModel.find({ refreshToken }).exec();
}

/**
 * @exports
 * @method findLast
 * @summary get an older record in database
 * @returns {Promise<AuthModel>}
 */
function findLast() {
  return AuthModel.find().limit(1).sort({ date: 1 }).exec();
}

/**
 * @exports
 * @method create
 * @param {object} profile
 * @summary create a new refreshToken record in database
 * @returns {Promise<AuthModel>}
 */
function create(profile) {
  return AuthModel.create(profile);
}

/**
 * @exports
 * @method deleteById
 * @param {string} _id
 * @summary delete a record from database
 * @returns {Promise<void>}
 */
function deleteById(_id) {
  return AuthModel.deleteOne({ _id }).exec();
}

/**
 * @exports
 * @method countRecords
 * @summary count records tokens collection
 * @returns {Promise<void>}
 */
function countRecords() {
  return AuthModel.countDocuments().exec();
}

module.exports = {
  findLast,
  create,
  deleteById,
  countRecords,
  findByToken,
};
