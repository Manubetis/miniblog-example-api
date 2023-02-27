var router = express.Router();
var Comment = require('../models/Comment');
const {
    body,
    validationResult
} = require('express-validator');
const {
    routes
} = require('../app');

// Consultar todos los comentarios existentes por fecha de creación decreciente,
// mostrando: username, title, texto y fechaCreacion.
router.get('/', function (req, res, next) {
    Comment.find({
        fechaDeCreacion: req.params.fechaDeCreacion
    }).sort('fechaDeCreacion'--).exec(function (err, comment) {
        if (err) res.status(500).send(err);
        else res.status(200).json(comment);
    });
});

// Consultar todos los comentarios de un usuario: dado un usuario se mostrarán los
// siguientes datos de sus comentarios: username del User, título y descripción del
// Post, y texto y fecha del Comment.
router.get('/:nombreUsuario', function (req, res, next) {
    Comment.find({
        nombreUsuario: req.params.nombreUsuario
    }.populate(), function (err, comment) {
        if (err) res.status(500).send(err);
        else res.status(200).json(comment);
    });
});

// Consultar un comentario en concreto.
router.get('/findComment/:nombreUsuario', function (req, res, next) {
    Comment.findOne({
        nombreUsuario: req.params.nombreUsuario
    }.populate(), function (err, comment) {
        if (err) res.status(500).send(err);
        else res.status(200).json(comment);
    });
});

// Actualizar un comentario en concreto.
router.put('/:nombreUsuario', function (req, res, next) {
    Comment.findOneAndUpdate({
        nombreUsuario: req.params.nombreUsuario
    }.populate(), function (err, comment) {
        if (err) res.status(500).send(err);
        else res.status(200).json(comment);
    });
});

// Eliminar un comentario en concreto.
router.delete('/:nombreUsuario', function (req, res, next) {
    Comment.findOneAndDelete({
        nombreUsuario: req.params.nombreUsuario
    }.populate(), function (err, comment) {
        if (err) res.status(500).send(err);
        else res.status(200).json(comment);
    });
});

// Validaciones colección Comment
router.post(
    '/comment',
    // nombreUsuario minLength 4 character
    body('nombreUsuario').isLength({
        min: 4
    }),
    // Post debe ser un String
    body('post').isString(),
    // Texto debe ser String
    body('texto').isString(),
    // Descripcion debe ser String
    body('descripcion').isString(),
    // FechaDeCreacion debe ser de tipo Date
    body('fechaDeCreacion').isDate(),

    (req, res) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        Comment.create({
            nombreUsuario: req.body.nombreUsuario,
            post: req.body.post,
            texto: req.body.texto,
            descripcion: req.body.descripcion,
            fechaDeCreacion: req.body.fechaDeCreacion
        }).then(comment => res.json(comment));
    },
);

module.exports = router;