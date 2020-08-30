/* eslint-disable require-jsdoc */
const {register} = require('./gameRegister');

function checkGame(req, res, next) {
  const {gameId} = req.params;
  const game = register.find(gameId);
  if (!game) {
    res.status(404).json({message: 'Game was not found'});
  }
  next();
}

module.exports = {
  checkGame,
};
