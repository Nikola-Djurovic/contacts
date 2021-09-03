'use strict';
const createTokenTime = (req, res) => {
    Token.create(req.body)
      .then((data) => {
        console.log('New Token Created!', data);
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
  module.exports = {
    createTokenTime
  };