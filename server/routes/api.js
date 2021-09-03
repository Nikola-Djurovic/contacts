const express = require('express');

const {
  createData,
  readData,
  updateData,
  deleteData,
} = require('../controllers/user_controller');
const {
  createLogin,
  readLogin,
  updateLogin,
  deleteLogin,
} = require('../controllers/login_controller');
const {
  createTokenTime
} = require('../controllers/token_controller');
const router = express.Router();

router
  .post('/contacts/', createData)
  .get('/contacts/:id', readData)
  .put('/contacts/:id', updateData)
  .delete('/contacts/:id', deleteData)
  .post('/login/', createLogin)
  .get('/login/:userid', readLogin)
  .post('/login/register', updateLogin)
  .delete('/login/:id', deleteLogin)
  .post('/login/timestamp/',createTokenTime);
module.exports = router;
