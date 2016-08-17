'use strict';

require('babel-register');

let app = require('express')();
let routes = require('./Router/index.js');

app.use('/api', routes);

app.listen(3000, () => 
  console.log('LFE listening on port 3000!')
);
