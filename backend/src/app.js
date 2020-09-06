/* eslint-disable max-len */
const controllers = require('./controllers');
const middleWare = require('./middleWare');
const express = require('express');

const app = express();
app.use(express.json());

// /api/me/token --> give tiken for user. Sign: gameId and userId
app.post('/api/me/token', controllers.getToken);

// /api/game
app.get('/api/games/:gameId/info', middleWare.checkGame, middleWare.checkToken, controllers.gameInfo);
app.post('/api/games', controllers.createGame); // create the game;
app.get('/api/games/:gameId', middleWare.checkGame, controllers.connectToGame); // connect to game;
app.put('/api/games/:gameId/setting', controllers.settingsForGame); // add settings for game, how many players, mafias and civilians
app.post('/api/games/:gameId/players', middleWare.checkGame, controllers.addPlayers);
app.put('/api/games/:gameId/roles', middleWare.checkGame, controllers.giveRoles);
// /api/player
app.put('/api/players/place', middleWare.checkToken, controllers.changePlace);
app.put('/api/players/:playerId/status', middleWare.checkToken, controllers.changePlayerStatus);
app.put('/api/players/:playerId/name', middleWare.checkToken, controllers.changePlayerName);

//
app.put('/api/game/:gameId/vote', middleWare.checkGame, middleWare.checkToken, controllers.vote);

module.exports = {
  app,
};
