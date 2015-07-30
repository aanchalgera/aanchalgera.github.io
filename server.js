var parser = require('./parser');
var http = require("http");
http.createServer(parser.parse).listen(8888);
