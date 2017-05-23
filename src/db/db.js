var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mhive');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection: error'));
db.once('open', function() {
  console.log('Mongoose connection successful');
});

var abSchema = mongoose.Schema({
    id: String,
    red: Number,
    blue: Number
});

var records = mongoose.model('records', abSchema);

var updateDB = function(req, res) {
  console.log('POST request on /api/updateRecord')
  var data = req.body.data;
  records[data.id] = {blue: data.blue, red: data.red};
  mongoose.model('records').update({id: data.id}, {blue: data.blue, red: data.red});
  res.status(200);
  res.send(JSON.stringify(records));
}

var getAll = function() {
  mongoose.model('records').find({}, function(err, data) {
    if (err) {
      console.log('err', err);
      return;
    }
    console.log('data', data);
    res.send(data);
  });
}

module.exports.updateDB = updateDB;
module.exports.getAll = getAll;

// app.post('/scoreBoard', function(req, res) {
//   console.log('POST request recieved on /scoreBoard');
//   req.on('data', function(chunk) {
//     var data = JSON.parse(chunk.toString());
//     if (data[0] === 'player1') {
//       scoreBoard.update({name: /^player1/}, {$set: {score: data[1]}}, function() {
//         console.log('updating player1 score with', data[1]);
//         res.send('');
//       });
//     } else if (data[0] === 'player2') {
//       scoreBoard.update({name: /^player2/}, {$set: {score: data[1]}}, function() {
//         console.log('updating player2 score to', data[1]);
//         res.send('');
//       });
//     }
//   })
// });