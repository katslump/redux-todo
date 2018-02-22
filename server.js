const express = require('express');
const path = require('path');
const compress = require('compression');

app = express();
var port = parseInt(process.env.PORT) || 3000;


const publicPath = path.join(__dirname, 'build');
app.use(express.static(publicPath));
app.use(compress());

app.listen(port, function() {
  console.log("app is listening to: " + port );
});
