'use strict';
var express = require('express')
,   bodyParser = require('body-parser')
,   app = express()
,   parserRoutes = require(__dirname + '/jsonParser/routes')
;

app.use(bodyParser.json({ type: 'text/plain' }));
app.use('/parse', parserRoutes);

app.listen(81);