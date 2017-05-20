var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


var port = 3000;
var records = {};

app.post('/api/updateRecord', function(req, res) {
  console.log('POST request on /api/updateRecord')
  var data = req.body.data;
  records[data.id] = {blue: data.blue, red: data.red};
  res.status(200);
  res.send(JSON.stringify(records));
});

app.use(express.static(path.resolve(__dirname, '../app')));

app.use('/', function (req, res){
  res.sendFile(path.resolve(__dirname, '../app', 'index.html'))
})

app.listen(port, function() {
  console.log('Listening on port', port);
})