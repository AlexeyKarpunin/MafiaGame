const {User} = require('./User');


/**
 * class Game with setting for game
 */
class Game {
  /**
   * this is constructor
   */
  constructor() {
    this._status = 'created';
    this._players = new Map();
    this._readinessPlayersToStart = false;
  }
  /**
   * @param {string} player id
   * @return {object}
   */
  findPlayer(player) {
    const gamer = this._players.get(player);
    if (!gamer) {
      return messages.PlayerNotFound;
    }
    return gamer;
  }
  /**
   * @param {string} userId
   */
  playersRegistery(userId) {
    this._players.set(userId, new User());
  }
}
module.exports = {
  Game,
};
