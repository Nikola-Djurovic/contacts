const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'name field is required'],
    },
    mobile: {
      type: String,
      required: [true, 'mobile field is required'],
    },
    landline: {
      type: String,
      required: [true, 'landline field is required'],
    },
    email: {
      type: String,
      required: [true, 'email field is required'],
    },
    fax: {
      type: String,
      required: [true, 'fax field is required'],
    },
    ownerId: {
      type: Number
    },
    id: {
      type: Number
    }
    
  },
  { timestamps: true },
);

module.exports = model('contacts', userSchema,'admin_app_contact');
