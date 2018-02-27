// Import dependencies
const express = require('express');
var session = require('express-session')
const path = require('path');
const mongoose = require('mongoose');
const axios = require('axios');
const compress = require('compression');
const routes = require('./app/routes');
const bodyParser = require('body-parser');
const dbRoutes = require('./app/routes/databaseAccess.js');
const passport = require('passport');
const LocalStrategy = require('passport-local');
var MongoStore = require('connect-mongo')(session);
const crypto = require('crypto');
var auth = require('./app/routes/auth.js');

// Create instances
var app = express();
var router = express.Router();

// Import TodoItem model
var TodoItem = require('./app/models/TodoItem.js').Todo;
var User = require('./app/models/User.js').User;

// Set port
var port = parseInt(process.env.PORT) || 3000;

// Configure API to use bodyParser and look for
// JSON data in the request body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Configure database endpoint pathes
app.use('/db', dbRoutes);

// Set /build as our static content directory
const publicPath = path.join(__dirname, 'build');

// Set app view engine
// app.set('view engine', 'jsx');

// Point the app to our static assets
app.use(express.static(publicPath));

// Automatically gzip compresses all of our HTTP body data
app.use(compress());

// Checks for database connection string in env.sh
if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not in the environmental variables. Try running 'source env.sh'");
}

// When successfully connected to db
mongoose.connection.on('connected', function() {
  console.log('Success: connected to MongoDb!');
});

// If the connection throws an error when connecting to db
mongoose.connection.on('error', function(error) {
console.log(error);
  process.exit(1);
});

// Creates database connection
mongoose.createConnection(process.env.MONGODB_URI);

// Session info here
app.use(session({
    secret: process.env.SECRET,
    store: new MongoStore({
        mongooseConnection: require('mongoose').connection
    })
}));

app.use(passport.initialize());
app.use(passport.session());

// Passport Strategy
// HASH function
function hashPassword(password) {
    var hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
}

// Passport Serialize
passport.serializeUser(function(user, done) {
// Takes in function(user, done){}
// We use done to send back to passport what part we want to store in the session
// In this case we want it to store the user id
  done(null, user._id);
});

// Passport Deserialize
passport.deserializeUser(function(id, done) {
     User.findById({_id: id}, function(error, user) {
         if (error) {
             done(null, false);
         } else if (!user) {
             done(null, false);
         }
         else {
             done(null, user);
         }
     });
});

// Initialize Passport
passport.use(new LocalStrategy(
  function(username, password, done) {
     var hashedPassword = hashPassword(password);

     User.findOne({email: username}, function (error, user) {
         // If there is an error
         if (error) {
             console.log(error);
             return done(error);
         }
         // If user does not exist
         if (!user) {
             console.log(user);
             return done(null, false, {message: "Incorrect username." });
         }
         // If passwords match
         if (user.password === hashedPassword) {
             console.log("YES a user");
             return done(null, user);
         } else {
             console.log("NOT a user");
             return done(null, false);
         }
     });

  }
));

app.use('/', auth(passport));

// Starts listening at the port number on which the server should accept incoming requests
app.listen(port, function() {
  console.log("app is listening to: " + port);
});

module.exports = app;
