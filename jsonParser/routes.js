'use strict';
var express = require('express')
,   router = express.Router()
,   parser = require(__dirname + '/parser.js')
,   result
;

router.post('/', function (request, response) {
    if ('production' == process.env.NODE_ENV) {
        parser.setCloudinaryPath('http://res.cloudinary.com/realarpit/image/upload');
        parser.setCdnPath('http://i1.blogs.es');
    }
    try {
        result = parser.parse(request.body);
        var finalResponse = {"status": "success", "response": result};
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.send(JSON.stringify(finalResponse));
    } catch (e) {
        console.log(e);
        response.json('{"status": "failure", "data": "invalid JSON"}');
    }
});

router.get('/:fileName', function (request, response) {
    result = JSON.parse(parser.testRead(request.params.fileName));
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.send(result.parsedData);
});

module.exports = router;