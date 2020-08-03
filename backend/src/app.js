const express = require('express');
const {GameRegister} = require('./GameRegister');
const {User} = require('./User');
const {generateId} = require('./units');
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
app.get('/api/game', (req, res) => {
  const {gameId} = req.body;
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
  res.status(200).json({game: game, player: game._players
      .get(userId), userId: userId});
});

// change User name
app.put('/api/game/:gameId/name', (req, res) => {
  const {userId, newName} = req.body;
  const {gameId} = req.params;
  const game = register.find(gameId);
  if (!game) {
    res.status(404).json({message: 'game was not found'});
  } else {
    const player = game.findPlayer(userId);
    if (!player) {
      res.status(404).json({message: 'player was not found'});
    } else {
      player.changeUserName(newName);
      res.status(200).json({player: player});
    }
  }
});

// change User status
app.put('/api/game/:gameId/status', (req, res) => {
  const {userId, status} = req.body;
  const {gameId} = req.params;
  const game = register.find(gameId);
  if (!game) {
    res.status(404).json({message: 'game was not found'});
  } else {
    const player = game.findPlayer(userId);
    if (!player) {
      res.status(404).json({message: 'player was not found'});
    } else {
      player.changeUserStatus(status);
      res.status(200).json({player: player});
    }
  }
});
module.exports = {
  app,
};
