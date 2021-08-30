'use strict';
var jwt = require('jsonwebtoken'); 
const Login = require('../models/login_schema');

const createLogin = (req, res) => {
  Login.find({username:req.body.username}).then((data)=>
    { 
      //console.log(req.body.hashedpassword);
      if(data[0].hashedpassword==req.body.hashedpassword)
      {
        var token = jwt.sign(data[0].ownerId,"A bit of spice");
        res.status(200).json({'token':token});
      }
      else
      {
      res.status(201).json({message:"Bad password"});
      }
    }
  )
  // Login.create(req.body)
  //   .then((data) => {
  //     console.log('New Login Created!', data);
  //     res.status(201).json(data);
    
    .catch((err) => {
      if (err.name === 'ValidationError') {
        console.error('Error Validating!', err);
        res.status(422).json(err);
      } else {
        console.error(err);
        res.status(500).json(err);
      }
    });
};

const readLogin = (req, res) => {
  Login.find({username:req.params.userid})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

const updateLogin = (req, res) => {
  Login.findByIdAndUpdate(req.params.id, req.body, {
    useFindAndModify: false,
    new: true,
  })
    .then((data) => {
      console.log('Login updated!');
      res.status(201).json(data);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        console.error('Error Validating!', err);
        res.status(422).json(err);
      } else {
        console.error(err);
        res.status(500).json(err);
      }
    });
};

const deleteLogin = (req, res) => {
  Login.findById(req.params.id)
    .then((data) => {
      if (!data) {
        throw new Error('Login not available');
      }
      return data.remove();
    })
    .then((data) => {
      console.log('Login removed!');
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

module.exports = {
  createLogin,
  readLogin,
  updateLogin,
  deleteLogin,
};
