'use strict';

var router = require('./server');
var http = require('http');

const port = process.env.PORT || '3000';

var server = http.createServer(router);

server.listen(port, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example router listening at http://%s:%s", host, port)
});

