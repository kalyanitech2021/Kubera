var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var usersRouter = require('./routes/users.routes');
var stockRouter = require('./routes/stock.routes');
var dividendRouter = require('./routes/dividend.routes');
var portfolioRouter = require('./routes/portfolio.routes');

var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', usersRouter);
app.use('/api/stock', stockRouter);
app.use('/api/dividend', dividendRouter);
app.use('/api/portfolio', portfolioRouter);

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

// All mongodb/mongoose related stuff
var users = require('./models/users.model');
var stock = require('./models/stock.model');
var dividend = require('./models/dividend.model');

var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost:27017/StocksDatabase';
mongoose.connect(mongoDB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.Promise = global.Promise;

mongoose.connection.on('connected', () => {
  console.log('Mongoose/MongoDB connected');
});
mongoose.connection.on('error', (err) => {
  console.log('Mongoose/MongoDB connection error: ${err}');
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose/MongoDB disconnected');
});

app.use(users);
app.use(stock);
app.use(dividend);

module.exports = app;