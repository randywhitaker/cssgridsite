var http = require('http');
var url  = require('url');
var fs = require('fs');

var handler = function(req, res) {

  var pathname = url.parse(req.url).pathname;
  console.log("Request for " + pathname);

  fs.readFile(__dirname + pathname, function(err, data) {
    if (err) {
       res.writeHead(500);
       return res.end('Error loading ' + pathname);
    } else {
       res.writeHead(200);
       res.end(data);
    }
  });

}

var app = http.createServer(handler);
app.listen(80);
console.log('Server running!');