'use strict';

require('babel-register');

let app = require('express')();
let routes = require('./Router/index.js');

app.use('/api', routes);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, () => 
  console.log('Example app listening on port 3000!')
);
