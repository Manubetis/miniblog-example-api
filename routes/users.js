var express = require('express');
var router = express.Router();
const User = require('../models/User');

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

module.exports = router;