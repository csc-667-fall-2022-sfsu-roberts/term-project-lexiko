if (process.env.NODE_ENV === 'development') {
  require("dotenv").config();
}
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var session = require('express-session');
// const pgSession = require('connect-pg-simple')(session);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testsRouter = require('./routes/tests');
// var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var authRouter = require('./routes/auth');
var forgotRouter = require('./routes/forgot');
var sockettest = require('./routes/sockettest');
var gameRouter = require('./routes/game');


var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// socket stuff
var http = require('http').Server(app);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/*
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  // store: new (require('connect-pg-simple')(session))({
  //   // Insert connect-pg-simple options here
  // })
}));
*/
 /*
//Whenever someone connects this gets executed
io.on('connection', function(socket) {
  console.log('A user connected');

  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
     console.log('A user disconnected');
  });
});
*/

app.use('/', indexRouter);
app.use('/auth',authRouter);
app.use('/users', usersRouter);
app.use('/tests', testsRouter);
// app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/forgot',forgotRouter);
app.use('/game',gameRouter);

//socket tests
app.use('/sockettest', sockettest);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
