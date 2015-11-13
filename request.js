var request = require("request");
var fs = require('fs');

var testJson = fs.readFileSync('./templates/test.json', 'utf8');

request({
  uri: "http://localhost:81/parse",
  method: "POST",
  json: testJson,
  headers: {
      "content-type": "application/json",
  }
}, function(error, response, body) {
    if (null === error) {
        console.log(body);
    } else {
        console.log(error);
    }
});