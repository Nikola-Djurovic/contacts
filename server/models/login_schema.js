const { Schema, model } = require('mongoose');

const loginSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'name field is required'],
    },
    hashedpassword: {
      type: String,
      required: [true, 'name field is required'],
    },
    ownerId: {
      type: Number
    }
    
  },
  { timestamps: true },
);

module.exports = model('login', loginSchema);