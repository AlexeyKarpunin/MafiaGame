const express = require('express');

const app = express();

app.get('/', function(req, res) {
  res.send('start page');
});

app.get('/room', function(req, res) {
  res.send('Game room');
});

app.listen(3000, function() {
  console.log('Example app listening on port  http://localhost:3000/ !');
});
