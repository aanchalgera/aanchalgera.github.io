'use strict';

require('babel-register');

let env = process.env.NODE_ENV || 'development';
global.envConfig = require(`./Config/config.${env}.json`);

let app = require('express')();
let routes = require('./Router');

app.use('/api', routes);

app.listen(81,"0.0.0.0", () => 
  console.log('LFE listening on port 81!')
);
