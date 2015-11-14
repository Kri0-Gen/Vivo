var express = require('express');

var app = express();
var models = require('./model/index.js');

app.use(express.bodyParser());
models(app);

app.use(express.static('./client'));

var server = app.listen(4000, function () {
   var host = server.address().address;
   var port = server.address().port;

   console.log('Example app listening at http://%s:%s', host, port);
});