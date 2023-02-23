var router = express.Router();
var Comment = require('../models/Comment');

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

module.exports = router;