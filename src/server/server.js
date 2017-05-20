var express = require('express');
var path = require('path');
var app = express();

var port = 3000;


app.use(express.static(path.resolve(__dirname, '../app')));

app.use('/', function (req, res){
  res.sendFile(path.resolve(__dirname, '../app', 'index.html'))
})

app.listen(port, function() {
  console.log('Listening on port', port);
})