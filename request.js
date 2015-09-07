var request = require("request");
var fs = require('fs');

var testJson = fs.readFileSync('./templates/test.json', 'utf8');

request({
  uri: "http://localhost:81/parse2",
  method: "POST",
  json: testJson
}, function(error, response, body) {
	if (null === error) {
  		// console.log(body);
	} else {
		console.log(error);
	}
});