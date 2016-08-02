var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

module.exports={
  loggedIn: function(req, res, next){
    if(req.session.loggedin){
      next();
    }
    else{
      res.redirect('/signin')
    }
  }
}
