'use strict';
var parser = require('./parser.js');
var http = require("http");
var result;

http.createServer(processRequest).listen(81);

function processRequest(request, response)
{
    var requestData = '';
    request.on('data', function (data) {
        requestData = data;
    });
    request.on('end', function () {
        console.log(request.url);
        switch(request.url) {
            case '/process':
                result = parser.processRequest(request.headers.host);
                sendResponse(response, result);
                break;
            case '/test':
                result = parser.testRead();
                sendResponse(response, result);
                break;
            case '/parse':
                try {
                    result = parser.parse(request.url, requestData);
                    sendResponse(response, '{"status": "success", "data": '+result+'}');
                } catch (e) {
                    console.log(e);
                    sendResponse(response, '{"status": "failure", "data": "invalid JSON"}');
                }
                break;
        }
    });
}

function sendResponse(response, output)
{
    response.setHeader('content-type', 'text/html');
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
    response.writeHead(200);
    response.write(output);
    response.end();
}