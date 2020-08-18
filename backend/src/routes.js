const jwt = require('jsonwebtoken');
const {generateId} = require('./units');
const {Game} = require('./Game');
const {GameRegister} = require('./GameRegister');

const register = new GameRegister;
const secret = 'TokenSectret3000pro';

// Post API created the game
const createGame = (req, res) => {
  const gameId = generateId();
  const game = new Game();
  register.register(gameId, game);
  res.status(201).json({gameId: gameId, game: game});
};

// Get a token
const getToken = (req, res) => {
  const {gameId, userId} = req.body;
  if (!gameId && !userId) {
    res.status(400);
  } else {
    const token = jwt.sign({gameId: gameId, userId: userId}, secret);
    res.json(token);
  }
};

// game was created. Players can connect
const connectToGame = (req, res) => {
  const {gameId} = req.params;
  const game = register.find(gameId);
  if (!game) {
    res.status(404);
  }
  res.status(200).json({game: game, gameId: gameId});
};

// registary user into class Game
const registeryUser = (req, res) => {
  const userId = generateId();
  const {gameId} = req.body;
  const game = register.find(gameId);
  if (!game) {
    res.status(404);
  }
  game.playersRegistery(userId);
  res.status(200).json({userId: userId});
};

module.exports = {
  getToken,
  createGame,
  connectToGame,
  registeryUser,
};
