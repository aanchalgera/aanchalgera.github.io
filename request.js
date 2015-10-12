var request = require("request");
var fs = require('fs');

var testJson = fs.readFileSync('./templates/allcases.json', 'utf8');

request({
  uri: "http://localhost:3000/parse",
  method: "POST",
  json: testJson
}, function(error, response, body) {
	if (null === error) {
  		// console.log(body);
	} else {
		console.log(error);
	}
});