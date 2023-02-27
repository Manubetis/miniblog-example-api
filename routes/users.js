var express = require('express');
const {
  routes
} = require('../app');
var router = express.Router();
const User = require('../models/User');
const {
  body,
  validationResult
} = require('express-validator');

// GET de un Usuario por su username 
router.get('/:username', function (req, res, next) {
  User.findOne({
    username: req.params.username
  }, function (err, user) {
    if (err) res.status(500).send(err);
    else res.status(200).json(user);
  });
});

// Put de un Usuario por su username 
router.put('/:username', function (req, res, next) {
  User.findOneAndUpdate({
    username: req.params.username
  }, function (err, user) {
    if (err) res.status(500).send(err);
    else res.status(200).json(user);
  });
});

// Delete de un Usuario por su username 
router.delete('/:username', function (req, res, next) {
  User.findOneAndDelete({
    username: req.params.username
  }, function (err, user) {
    if (err) res.status(500).send(err);
    else res.status(200).json(user);
  });
});

// Validaciones colección User
router.post(
  '/user',
  // Username minLength 4 character
  body('username').isLength({
    min: 4
  }),
  // password maxLength 15 character
  body('password').isLength({
    max: 15
  }),
  // Fullname debe ser un String
  body('fullname').isString(),
  // email debe ser tipo email
  body('email').isEmail(),
  // Tipo debe ser String
  body('tipo').isString(),
  // Posts es numerico
  body('posts').isNumeric(),

  (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    User.create({
      username: req.body.username,
      password: req.body.password,
      fullname: req.body.fullname,
      email: req.body.email,
      tipo: req.body.tipo,
      posts: req.body.posts,
    }).then(user => res.json(user));
  },
);

module.exports = router;