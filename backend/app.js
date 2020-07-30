const express = require('express');
const jwt = require('jsonwebtoken');
const {generateId} = require('./units');
const {GameRegister} = require('./GameRegister');
const {Game} = require('./Game');
const app = express();
app.use(express.json());

const register = new GameRegister;
const secret = 'TokenSecretKey';

// Post API created the game
app.post('/api/game', (req, res) => {
  const gameId = generateId();
  const game = new Game();
  register.register(gameId, game);
  const token = jwt.sign({id: gameId}, secret, {expiresIn: 120});
  res.status(201).json({token: token, gameId: gameId});
});

// Get API connect to game
app.get('/api/game', (req, res) => {
  const {gameId} = req.body;
  const game = register.find(gameId);
  if (!game) {
    res.status(404).json({message: 'game did not found'});
  }
  const token = jwt.sign({id: gameId}, secret, {expiresIn: 120});
  res.status(201).json({token: token});
});
// test API
app.get('/api/test', (req, res) => {
  res.json({message: 'success'});
});
// Put API take place
app.put('/api/game/:gameId/place', (req, res) => {
  const player = req.body;
  const {gameId} = req.params;
  const game = register.find(gameId);
  if (!game) {
    res.status(404).json({message: 'game was not founded'});
  }
  if (game.takeplace(player)) {
    res.status(200)
        .json({message: 'success'});
  } else {
    res.json({message: 'Place was occupated'});
  }
});
module.exports = {
  app,
};
