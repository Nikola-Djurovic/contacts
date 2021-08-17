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

const router = express.Router();

router
  .post('/contacts/', createData)
  .get('/contacts/', readData)
  .put('/contacts/:id', updateData)
  .delete('/contacts/:id', deleteData)
  .post('/login/', createLogin)
  .get('/login/', readLogin)
  .put('/login/:id', updateLogin)
  .delete('/login/:id', deleteLogin);
  
module.exports = router;
