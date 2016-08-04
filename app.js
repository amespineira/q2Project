var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session')
var passport = require('passport');
var facebookStrategy =require('passport-facebook').Strategy
var routes = require('./routes/index');
var auth = require('./routes/auth');
var userbouncer= require('./routes/userbouncer')
var inventory = require('./routes/inventory')
var equipment = require('./routes/equipment')
var batch = require('./routes/batch')
var beer= require('./routes/beer')
var main = require('./routes/main')
var help = require('./routes/help')
var finished_batches = require('./routes/finished_batches')
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
app.use(passport.initialize());
app.use(passport.session());
console.log(process.env.FACEBOOK_CLIENT_ID);
passport.use(new facebookStrategy({
    clientID: 1771655133113253,
    consumerSecret: '04d0ae3724d29511fe106654b0edaffb',
    callbackURL: process.env.HOST + "auth/facebook/callback"
  },
  function(token, tokenSecret, profile, done) {
    // To keep the example simple, the user's LinkedIn profile is returned to
    // represent the logged-in user. In a typical application, you would want
    // to associate the LinkedIn account with a user record in your database,
    // and return that user instead (so perform a knex query here later.)
    done(null, profile)
  }
));
  // passport.use(new facebookStrategy({
  //     consumerKey: process.env.LINKEDIN_CLIENT_ID,
  //     consumerSecret: process.env.LINKEDIN_CLIENT_SECRET,
  //     callbackURL: process.env.HOST + "auth/linkedin/callback"
  //   },
  //   function(token, tokenSecret, profile, done) {
  //     // To keep the example simple, the user's LinkedIn profile is returned to
  //     // represent the logged-in user. In a typical application, you would want
  //     // to associate the LinkedIn account with a user record in your database,
  //     // and return that user instead (so perform a knex query here later.)
  //     done(null, profile)
  //   }
  // ));
passport.serializeUser(function(user, done) {
 // later this will be where you selectively send to the browser an identifier for your user, like their primary key from the database, or their ID from linkedin
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  //here is where you will go to the database and get the user each time from it's id, after you set up your db
  done(null, user)
});
app.use('/', routes);
app.use('/auth', auth);
app.use('/', userbouncer.loggedIn);
app.use('/inventory', inventory);
app.use('/equipment', equipment);
app.use('/batch', batch);
app.use('/beer', beer);
app.use('/main', main);
app.use('/help', help);
app.use('/finished_batches', finished_batches);
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
