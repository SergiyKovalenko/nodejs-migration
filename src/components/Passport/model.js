const { Schema } = require('mongoose');
const connections = require('../../config/connection');

const PassportSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'userAdmin',
    versionKey: false,
  },
);

module.exports = connections.model('PassportModel', PassportSchema);
