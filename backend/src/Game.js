const {status, gameSetForFourthPlayers} = require('../src/config').config;
/**
 * class Game with setting for game
 */
class Game {
  /**
   * this is constructor
   */
  constructor() {
    this._status = status.created;
    this._players = new Map();
    this._readinessPlayersToStart = false;
  }

  /**
   * take place at the table
   * @param {string} userId
   * @param {class} user
   * @param {string} place
   * This object whith setting for player {status, role, ...}
   * @return {boolean} false of true
   */
  takePlace(userId, user, place) {
    if (!this._players.has(userId)) {
      this._players.set(userId, user);
      const gamer = this._players.get(userId);
      gamer.changeUserPlace(place);
      return true;
    } else {
      return false;
    }
  }
  /**
   * @param {string} player
   * @return {object}
   */
  findPlayer(player) {
    const gamer = this._players.get(player);
    if (!gamer) {
      return false;
    }
    return gamer;
  }
  /**
   * give roles for plyers
   */
  givingRoleForPlayers() {
    // eslint-disable-next-line max-len
    let randomNumber = Math.floor(Math.random() * gameSetForFourthPlayers.players);
    this._players.forEach((value) => {
      if (randomNumber === 0) {
        value._role = gameSetForFourthPlayers.mafia;
      } else {
        value._role = gameSetForFourthPlayers.peace;
      }
      randomNumber--;
    });
  }
  /**
   * checking status of players
   * @return {boolean}
   */
  checkingPlayersForReadiness() {
    let counterPlayerWhoReady = 0;
    this._players.forEach((value) => {
      if (value._status === status.ready) {
        counterPlayerWhoReady++;
      }
    });
    if (this._players.size === 4 && counterPlayerWhoReady === 4) {
      this._readinessPlayersToStart = true;
      return true;
    }
  }
}
module.exports = {
  Game,
};
