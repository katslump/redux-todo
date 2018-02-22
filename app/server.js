const express = require('express');
const path = require('path');
const compress = require('compression');

app = express();
app.listen(parseInt(process.env.PORT) || 3000);

const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));
app.use(compress());
