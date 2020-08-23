const express = require('express');
const routes = require('./routes');

const app = express();
app.use(express.json());

// POST
app.post('/api/token', routes.getToken);
app.post('/api/game', routes.createGame);
app.post('/api/user', routes.registeryUser);
// GET
app.get('/api/connect/:gameId', routes.connectToGame);
app.get('/api/name', routes.findName);
app.get('/api/status', routes.findStatus);
app.get('/api/place', routes.findPlace);
app.get('/api/role', routes.roleOfPlayer);
app.get('/api/readiness/:gameId', routes.playerReadiness);
// PUT
app.put('/api/:gameId/user/name', routes.changeUserName);
app.put('/api/:gameId/user/place', routes.takePlace);
app.put('/api/:gameId/user/status', routes.changeUserStatus);
app.put('/api/:gameId/roles', routes.giveRolesForPlayers);

module.exports = {
  app,
};
