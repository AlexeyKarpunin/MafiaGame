const express = require('express');
const {GameRegister} = require('./GameRegister');
const {User} = require('./User');
const {generateId} = require('./units');
const {messages} = require('./config').config;
const {Game} = require('./Game');
const app = express();
app.use(express.json());
const register = new GameRegister;

// Post API created the game
app.post('/api/game', (req, res) => {
  const gameId = generateId();
  const game = new Game();
  register.register(gameId, game);
  res.status(201).json({gameId: gameId, game: game});
});

// Get API connect to game
app.get('/api/game/:gameId', (req, res) => {
  const {gameId} = req.params;
  const game = register.find(gameId);
  if (!game) {
    res.status(404).json({message: 'game did not found'});
  }
  res.status(201).json({gameId: gameId, game: game});
});
// take place at the table
app.put('/api/game/:gameId/place', (req, res) => {
  const userId = generateId();
  const user = new User();
  const {place} = req.body;
  const {gameId} = req.params;
  const game = register.find(gameId);
  if (!game) {
    res.status(404).json({message: 'game was not found'});
  }
  game.takePlace(userId, user, place);
  res.status(200).json({game: game, place: place, player: game._players
      .get(userId), userId: userId});
});

// change User name
app.put('/api/game/:gameId/userName', (req, res) => {
  const {userId, newName, place} = req.body;
  const {gameId} = req.params;
  const game = register.find(gameId);
  if (!game) {
    res.status(404).json({message: 'game was not found'});
  } else {
    const player = game.findPlayer(userId);
    if (player === messages.PlayerNotFound) {
      res.status(404).json({message: 'player was not found'});
    } else {
      player.changeUserName(newName);
      game.changeName(place, newName);
      res.status(200).json({player: player, game: game});
    }
  }
});

// change User status
app.put('/api/game/:gameId/status', (req, res) => {
  const {userId, status, place} = req.body;
  const {gameId} = req.params;
  const game = register.find(gameId);
  if (!game) {
    res.status(404).json({message: 'game was not found'});
  } else {
    const player = game.findPlayer(userId);
    if (player === messages.PlayerNotFound) {
      res.status(404).json({message: 'player was not found'});
    } else {
      player.changeUserStatus(status);
      game.changeReadinessStatus(place, status);
      res.status(200).json({player: player, game: game});
    }
  }
});
// Are players ready to start game ?
app.get('/api/game/:gameId/check', (req, res) => {
  const {gameId} = req.params;
  const game = register.find(gameId);
  if (!game) {
    res.status(404).json({message: 'game was not found'});
  }
  if (game.checkPlayersForReadiness()) {
    res.status(200).json({message: 'game can be started'});
  }
  res.status(304).json({message: 'Not all players ready'});
});

// Give roles for players ...
app.put('/api/game/:gameId/roles', (req, res) => {
  const {gameId} = req.params;
  const game = register.find(gameId);
  if (!game) {
    res.status(404).json({message: 'game was not found'});
  }
  game.giveRoleForPlayers();
  res.status(200).json({message: 'Players were given  roles', game: game});
});
// give role
app.post('/api/game/:gameId/roles', (req, res) => {
  const {gameId} = req.params;
  const {userId} = req.body;
  const game = register.find(gameId);
  if (!game) {
    res.status(404).json({message: 'game was not found'});
  }
  const player = game.findPlayer(userId);
  if (player === messages.PlayerNotFound) {
    res.status(404).json({message: 'player was not found'});
  } else {
    res.status(200).json({role: player._role});
  }
});

module.exports = {
  app,
};
