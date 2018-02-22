// Import dependencies
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const axios = require('axios');
const compress = require('compression');
const bodyParser = require('body-parser');

// Create instances
var app = express();
var router = express.Router();

// Set port
var port = parseInt(process.env.PORT) || 3000;

// Configure API to use bodyParser and look for
// JSON data in the request body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Set /build as our static content directory
const publicPath = path.join(__dirname, 'build');

// Set app view enginer
app.set('view engine', 'hbs');

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
  console.log('Error connecting to MongoDb. Check MONGODB_URI in env.sh');
  process.exit(1);
});

// Creates database connection
mongoose.connect(process.env.MONGODB_URI);

// Starts listening at the port number on which the server should accept incoming requests
app.listen(port, function() {
  console.log("app is listening to: " + port);
});
