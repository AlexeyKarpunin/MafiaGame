const jwt = require('jsonwebtoken');
const {generateId} = require('../../Api/generateId');
const {register} = require('./gameRegister');
const {Game} = require('./Game');
const helper = require('./helpers');

const secret = 'secretMafiaGameToken';

const getToken = (req, res) => {
  const {gameId, userId} = req.body;
  if (!gameId || !userId) {
    res.status(409)
        .json(
            {
              // eslint-disable-next-line max-len
              message: `you have not gameId or userId. Game id: ${gameId}, user id: ${userId}`,
            });
  }
  const token = jwt.sign({gameId: gameId, userId: userId}, secret );
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
    arrayOfPlacesForGame: game.arrayOfPlacesForGame,
  });
};

const settingsForGame = (req, res) => {
  const {gameId} = req.params;
  const {civilian, mafia} = req.body;
  const game = register.find(gameId);
  if (!game) {
    res.status(400).json({message: 'Game was not found'});
  }
  const arrayOfPlacesForGame = game.gameSettings(civilian, mafia);
  res.status(200).json({
    civilian: civilian,
    mafia: mafia,
    arrayOfPlacesForGame: arrayOfPlacesForGame});
};

const addPlayers = (req, res) => {
  const {gameId} = req.params;
  const game = register.find(gameId);
  game.addPlayers();
  res.status(200).json({game: game.players, gameStatus: game.gameStatus});
};

const changePlace = (req, res) => {
  const autoHeader = req.get('Authorization');
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

const changePlayerStatus = (req, res) => {
  const autoHeader = req.get('Authorization');
  const payload = helper.decodeToken(autoHeader);
  const {userId, newStatus} = req.body;
  const {gameId} = payload;
  const game = register.find(gameId);
  if (!game.changePlayerStatus(newStatus, userId)) {
    res.status(409).json({message: 'status was not changed'});
  }
  res.status(200).json({userStatus: newStatus});
};

const changePlayerName = (req, res) => {
  const autoHeader = req.get('Authorization');
  const payload = helper.decodeToken(autoHeader);
  const {userId, newName} = req.body;
  const {gameId} = payload;
  const game = register.find(gameId);
  if (!game.changePlayerName(newName, userId)) {
    res.status(409).json({message: 'name was not changed'});
  }
  res.status(200).json({name: newName});
};

const gameInfo = (req, res) => {
  const {gameId} = req.params;
  const game = register.find(gameId);
  const placeArray = [];
  const authorization = req.get('Authorization');
  const token = authorization.replace('Bearer', '');
  const payload = jwt.decode(token);
  const {userId} = payload;
  let role;
  let userStatus;
  for (let i = 0; i < game.players.length; i++) {
    if (game.players[i].userId === userId) {
      role = game.players[i].role;
      userStatus = game.players[i].status;
    }
  }

  for (let i = 0; i < game.players.length; i++) {
    placeArray.push(Object.assign({}, game.players[i]));
  }

  for (let i = 0; i < placeArray.length; i++) {
    delete placeArray[i].role;
    delete placeArray[i].userId;
  }

  res.status(200).json({
    civilian: game.civilian,
    mafia: game.mafia,
    gameStatus: game.gameStatus,
    players: placeArray,
    role: role,
    userStatus: userStatus,
    timer: game.timer,
  });
};

const giveRoles = (req, res) => {
  const {gameId} = req.params;
  const game = register.find(gameId);
  const result = game.giveRolesForPlayers();
  res.status(200).json(result);
};

module.exports = {
  getToken,
  createGame,
  connectToGame,
  settingsForGame,
  addPlayers,
  changePlace,
  changePlayerStatus,
  changePlayerName,
  gameInfo,
  giveRoles,
};
