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
    res.json({token: token});
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

const changeUserName = (req, res) => {
  const {gameId} = req.params;
  const {userId, newName} = req.body;
  const game = register.find(gameId);
  if (!game) {
    res.status(404);
  }
  const user = game.findPlayer(userId);
  user.changeUserName(newName);
  res.status(200).json({name: newName});
};

const takePlace = (req, res) => {
  const {gameId} = req.params;
  const {userId, place} = req.body;
  const game = register.find(gameId);
  if (!game) {
    res.status(404);
  }
  const user = game.findPlayer(userId);
  user.changeUserPlace(place);
  res.status(200).json({place: place});
};

const changeUserStatus = (req, res) => {
  const {gameId} = req.params;
  const {userId, newStatus} = req.body;
  const game = register.find(gameId);
  if (!game) {
    res.status(404);
  }
  const user = game.findPlayer(userId);
  user.changeUserStatus(newStatus);
  res.status(200).json({status: newStatus});
};
// the function finds names of other players and return it
const findName = (req, res) => {
  const gameId = req.query.gameId;
  const place = req.query.place;
  const game = register.find(gameId);
  if (!game) {
    res.status(404);
  }
  const name = game.findName(Number(place));
  res.status(200).json({name: name});
};
// the function finds status of other players and return it
const findStatus = (req, res) => {
  const gameId = req.query.gameId;
  const place = req.query.place;
  const game = register.find(gameId);
  if (!game) {
    res.status(404);
  }
  const status = game.findStatus(Number(place));
  res.status(200).json({status: status});
};
// the function check: place is busy or not
const findPlace = (req, res) => {
  const gameId = req.query.gameId;
  const place = req.query.place;
  const game = register.find(gameId);
  if (!game) {
    res.status(404);
  }
  const placeStatus = game.findPlace(Number(place));
  res.status(200).json({placeStatus: placeStatus});
};
const playerReadiness = (req, res) => {
  const {gameId} = req.params;
  const game = register.find(gameId);
  if (!game) {
    res.status(404);
  }
  const result = game.checkReadiessPlayers();
  if (result) {
    res.status(200).json({readinessPlayersToStart: true});
  } else {
    res.status(304);
  }
};
// give roles for all players
const giveRolesForPlayers = (req, res) => {
  const {gameId} = req.params;
  const game = register.find(gameId);
  if (!game) {
    res.status(404);
  }
  game.giveRoleForPlayers();
  res.status(200).json({message: 'success'});
};
// player see his role on UI
const roleOfPlayer = (req, res) => {
  const gameId = req.query.gameId;
  const userId = req.query.userId;
  const game = register.find(gameId);
  if (!game) {
    res.status(404);
  }
  const user = game.findPlayer(userId);
  if (!user) {
    res.status(404);
  }
  res.status(200).json({role: user._role});
};

module.exports = {
  getToken,
  createGame,
  connectToGame,
  registeryUser,
  changeUserName,
  takePlace,
  changeUserStatus,
  findName,
  findStatus,
  findPlace,
  playerReadiness,
  giveRolesForPlayers,
  roleOfPlayer,
};
