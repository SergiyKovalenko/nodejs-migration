const { Schema } = require('mongoose');
const connections = require('../../config/connection');

const AuthSchema = new Schema(
  {
    refreshToken: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
      trim: true,
    },
  },
  {
    collection: 'tokens',
    versionKey: false,
  },
);

module.exports = connections.model('AuthModel', AuthSchema);
