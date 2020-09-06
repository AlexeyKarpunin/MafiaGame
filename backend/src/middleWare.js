/* eslint-disable require-jsdoc */
const {register} = require('./GameRegister');
const jwt = require('jsonwebtoken');

const secret = 'secretMafiaGameToken';

function checkGame(req, res, next) {
  const {gameId} = req.params;
  const game = register.find(gameId);
  if (!game) {
    res.status(404).json({message: 'Game was not found'});
  }
  next();
}

function checkToken(req, res, next) {
  const autoHeader = req.get('Authorization');
  if (!autoHeader) {
    res.status(401).json({message: 'token not provided!'});
  }
  const token = autoHeader.replace('Bearer ', '');
  const payload = jwt.verify(token, secret);
  if (!payload) {
    res.status(401).json({message: 'Invalid token'});
  }
  next();
}

module.exports = {
  checkGame,
  checkToken,
};


