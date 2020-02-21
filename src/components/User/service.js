const UserModel = require('./model');

module.exports = {

  /**
     * @exports
     * @method findAll
     * @param {}
     * @summary get list of all users
     * @returns Promise<UserModel[]>
  */
  async findAll() {
    return UserModel.find({});
  },

  /**
     * @exports
     * @method createUser
     * @param {}
     * @summary create user
     * @returns Promise<UserModel[]>
  */
  async createUser(req) {
    return UserModel.create({ email: req.body.email, name: req.body.fullName });
  },

  /**
     * @exports
     * @method updateUsers
     * @param {}
     * @summary update users
     * @returns Promise<UserModel[]>
  */
  async updateUsers(req) {
    return UserModel.updateMany({ name: req.body.fullName });
  },

  /**
     * @exports
     * @method deleteUser
     * @param {}
     * @summary delete user
     * @returns Promise<UserModel[]>
  */
  async deleteUser(req) {
    return UserModel.deleteOne({ email: req.body.email });
  },

  /**
     * @exports
     * @method findUsers
     * @param {}
     * @summary find users
     * @returns Promise<UserModel[]>
  */
  async findUsers(req) {
    return UserModel.find({ email: req.body.email });
  },
};
