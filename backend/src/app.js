/* eslint-disable max-len */
const routes = require('./routes');
const middleWare = require('./middleWare');
const express = require('express');

const app = express();
app.use(express.json());

// /api/me/token --> give tiken for user. Sign: gameId and userId
app.post('/api/me/token', routes.getToken);

// /api/game
app.post('/api/game', routes.createGame); // create the game;
app.get('/api/game/:gameId', middleWare.checkGame, routes.connectToGame); // connect to game;
app.put('/api/game/setting/:gameId', routes.settingsForGame); // add settings for game, how many players, mafias and civilians
app.put('/api/game/addPlayers/:gameId', middleWare.checkGame, routes.addPlayers);
// /api/player
app.put('/api/player/place', routes.changePlace);

module.exports = {
  app,
};
