const { Schema, model } = require('mongoose');

const tokensSchema = new Schema(
  {
    ownerId: {
      type: Number
        },
    token: {
      type: String
    },
    time: {
        type: Number
    },
    id: {
      type: Number
    }
  },
  { timestamps: true },
);

module.exports = model('tokens', tokensSchema, 'admin_app_token');
