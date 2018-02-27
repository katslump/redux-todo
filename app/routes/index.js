var express = require('express');
var router = express.Router();
var User = require('../models/User.js');

// THE WALL - anything routes below this are protected by our passport (user must be logged in to access these routes)!
router.use(function(req, res, next){
  if (!req.user) {
    res.redirect('/login');
  } else {
    return next();
  }
});

// GET: '/'
// Gets homepage if user is logged in
// CHECK: COMPLETE!
router.get('/', function(req, res) {
  res.send("Success! You are logged in.");
});
