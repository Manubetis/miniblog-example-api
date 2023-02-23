var express = require('express');
const Post = require('../models/Post');
var router = express.Router();
var Post = require('../models/Post');

// GET de un Post por su user 
router.get('/:user', function (req, res, next) {
    Post.findOne({
        user: req.params.user
    }.populate(), function (err, post) {
        if (err) res.status(500).send(err);
        else res.status(200).json(post);
    });
});

// Mostrar todos los post, todos sus datos así como el username del usuario.
router.get('/', function (req, res, next) {
    Post.find().exec(function (err, post) {
        if (err) res.status(500).send(err);
        else res.status(200).json(post);
    });
});

module.exports = router;