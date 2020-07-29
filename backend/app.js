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
  res.status(201).json({token: token});
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

module.exports = {
  app,
};
