'use strict';
var parser = require('./parser.js');
var http = require("http");
var result;

http.createServer(processRequest).listen(81);

function processRequest(request, response)
{
    var requestData = '';
    request.on('data', function (data) {
        requestData += data;
    });
    request.on('end', function () {
        if ('/parse' === request.url) {
            try {
                if (undefined !== process.argv[2]) {
                    console.log(requestData);
                }
                result = parser.parse(requestData);
                var finalResponse = {
                    "status": "success",
                    "response": result
                }
                sendResponse(response, JSON.stringify(finalResponse), 'json');
            } catch (e) {
                console.log(e);
                sendResponse(response, '{"status": "failure", "data": "invalid JSON"}');
            }
        } else {
            var match = /\/read\/(.+)?/.exec(request.url);
            if (null !== match) {
                result = parser.testRead(match[1]);
                sendResponse(response, result, 'html');
            }
        }
    });
}

function sendResponse(response, output, contentType)
{
    var responseContentType;
    if ('html' == contentType) {
        responseContentType = 'text/html';
    } else {
        responseContentType = 'applcation/json';
    }

    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
    response.setHeader('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

    response.writeHead(200);
    response.write(output);
    response.end();
}