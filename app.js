var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session')

var routes = require('./routes/index');
var auth = require('./routes/auth');
var userbouncer= require('./routes/userbouncer')
var inventory = require('./routes/inventory')
var equipment = require('./routes/equipment')
var batch = require('./routes/batch')
var beer= require('./routes/beer')
var main = require('./routes/main')
var help = require('./routes/help')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
  name: 'session',
  keys: ['id', 'loggedin']
}))

app.use('/', routes);
app.use('/auth', auth);
app.use('/', userbouncer.loggedIn);

app.use('/inventory', inventory);
app.use('/equipment', equipment);
app.use('/batch', batch);
app.use('/beer', beer)
app.use('/main', main)
app.use('/help', help)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
