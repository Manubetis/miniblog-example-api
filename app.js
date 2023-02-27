require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const { body, validationResult } = require('express-validator');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

let mongoose = require('mongoose');
mongoose.set('strictQuery', false); //requerido para quitar el warning
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true })
  .then(() => console.log('connection successful'))
  .catch((err) => console.error(err));

mongoose.connection;

// Validaciones colección User
app.post(
  '/user',
  // Username minLength 4 character
  body('username').isLength({min: 4}),
  // password maxLength 15 character
  body('password').isLength({ max: 15 }),
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
      return res.status(400).json({ errors: errors.array() });
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

// Validaciones colección Post
app.post(
  '/post',
  // Username minLength 4 character
  body('user').isLength({min: 4}),
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
      return res.status(400).json({ errors: errors.array() });
    }

    Post.create({
      user: req.body.user,
      title: req.body.title,
      description: req.body.description,
      publicationdate: req.body.publicationdate
    }).then(post => res.json(post));
  },
);

// Validaciones colección Comment
app.post(
  '/comment',
  // nombreUsuario minLength 4 character
  body('nombreUsuario').isLength({min: 4}),
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
      return res.status(400).json({ errors: errors.array() });
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

module.exports = app;