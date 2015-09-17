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
        var match = /\/read\/(.+)?/.exec(request.url);
        if (null !== match) {
            result = parser.testRead(match[1]);
            sendResponse(response, result);
        } else {
            switch(request.url) {
                case '/process':
                    result = parser.processRequest(request.headers.host);
                    sendResponse(response, result);
                    break;
                case '/test':
                    result = parser.testRead('test.json');
                    sendResponse(response, result);
                    break;
                case '/parse':
                    try {
                        if (undefined !== process.argv[2]) {
                            console.log(requestData);
                        }
                        result = parser.parse(request.url, requestData);
                        sendResponse(response, '{"status": "success", "data": '+result+'}');
                    } catch (e) {
                        console.log(e);
                        sendResponse(response, '{"status": "failure", "data": "invalid JSON"}');
                    }
                    break;
            }
        }
    });
}

function sendResponse(response, output)
{
    response.setHeader('content-type', 'text/html');
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
    response.setHeader('content-type', 'text/html');
    response.setHeader('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

    response.writeHead(200);
    response.write(output);
    response.end();
}