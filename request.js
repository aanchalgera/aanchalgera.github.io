var request = require("request");
var fs = require('fs');

var testJson = JSON.parse(fs.readFileSync('./test.json', 'utf8'));

request({
  uri: "http://localhost:8888",
  method: "POST",
  json: testJson
}, function(error, response, body) {
	if (null !== error) {
  		console.log(error);
	}
});