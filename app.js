
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const sessionInstance = require("./app-config/session-config");
var cookieParser = require('cookie-parser');
const logger = require('morgan');
// var session = require('express-session');
const pg = require('pg');
var router = express.Router();
const protect = require("./app-config/protect");

if (process.env.NODE_ENV === 'development') {
  require("dotenv").config();
}


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const testsRouter = require('./routes/tests');
const lobbyRouter = require('./routes/lobby');
const authRouter = require('./routes/auth');
const forgotRouter = require('./routes/forgot');


const app = express();


// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(sessionInstance);


app.use('/', indexRouter);
app.use('/lobby', protect, lobbyRouter);
app.use('/users', usersRouter);
app.use('/tests', testsRouter);
app.use('/auth', authRouter);
app.use('/forgot',forgotRouter);

// // catch 404 and forward to error handler
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
