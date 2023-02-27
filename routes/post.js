var express = require('express');
const {
    routes
} = require('../app');
const Post = require('../models/Post');
var router = express.Router();
var Post = require('../models/Post');
const {
    body,
    validationResult
} = require('express-validator');

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


// Validaciones colección Post
routes.post(
    '/post',
    // Username minLength 4 character
    body('user').isLength({
        min: 4
    }),
    // Title debe ser un String
    body('title').isString(),
    // Description debe ser String
    body('description').isString(),
    // Publicationdato debe ser de tipo Date
    body('publicationdate').isDate(),

    (req, res) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        Post.create({
            user: req.body.user,
            title: req.body.title,
            description: req.body.description,
            publicationdate: req.body.publicationdate
        }).then(post => res.json(post));
    },
);

module.exports = router;