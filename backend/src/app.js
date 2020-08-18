const express = require('express');
const routes = require('./routes');

const app = express();
app.use(express.json());


app.post('/api/token', routes.getToken);
app.post('/api/game', routes.createGame);
app.post('/api/user', routes.registeryUser);
app.get('/api/connect/:gameId', routes.connectToGame);


module.exports = {
  app,
};
