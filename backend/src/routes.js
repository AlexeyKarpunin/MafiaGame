const jwt = require('jsonwebtoken');
const {generateId} = require('../../Api/generateId');
const {register} = require('./gameRegister');
const {Game} = require('./Game');

const secret = 'secretMafiaGameToken';

const getToken = (req, res) => {
  const {gameId, userId} = req.body;
  if (!gameId || !userId) {
    res.status(409).end();
  }
  const token = jwt.sign( {gameId: gameId, userId: userId}, secret );
  res.status(200).json({token: token});
};

const createGame = (req, res) => {
  const gameId = generateId();
  const game = new Game();
  if (register.register(gameId, game)) {
    res.status(200).json({gameId: gameId});
  } else {
    res.status(423).json({message: 'this game was created'});
  }
};

const connectToGame = (req, res) => {
  const {gameId} = req.params;
  const game = register.find(gameId);
  res.status(200).json({
    message: 'You was connected',
    gameId: gameId,
    civilian: game.civilian,
    mafia: game.mafia,
  });
};

const settingsForGame = (req, res) => {
  const {gameId} = req.params;
  const {civilian, mafia} = req.body;
  const game = register.find(gameId);
  if (!game) {
    res.status(400).json({message: 'Game was not found'});
  }
  game.gameSettings(civilian, mafia);
  res.status(200).json({civilian: civilian, mafia: mafia});
};

const addPlayers = (req, res) => {
  const {gameId} = req.params;
  const game = register.find(gameId);
  game.addPlayers();
  res.status(200).json({game: game.players, gameStatus: game.gameStatus});
};

const changePlace = (req, res) => {
  const autoHeader = req.get('Authorization');
  if (!autoHeader) {
    res.status(401).json({message: 'token not provided!'});
  }
  const {placeNum} = req.body;
  const token = autoHeader.replace('Bearer ', '');
  const payload = jwt.decode(token);
  const {gameId, userId} = payload;
  const game = register.find(gameId);
  const {message, place} = game.takePlace(placeNum, userId);
  if (message === 'success') {
    res.status(200).json({message: message, place: place});
  } else {
    res.status(409).json({message: message});
  }
};

module.exports = {
  getToken,
  createGame,
  connectToGame,
  settingsForGame,
  addPlayers,
  changePlace,
};
