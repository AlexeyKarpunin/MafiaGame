const {User} = require('./User');
const {statuses} = require('../../Api/statuses');
const {roles} = require('../../Api/roles');

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
   * @param {number} value
   * @return {string}
   */
  findName(value) {
    let name;
    this._players.forEach( (user) => {
      if (user._place === value) {
        name = user._name;
      }
    });
    return name;
  }
  /**
   * @param {number} value
   * @return {string}
   */
  findStatus(value) {
    let status;
    this._players.forEach( (user) => {
      if (user._place === value) {
        status = user._status;
      }
    });
    return status;
  }
  /**
   * @param {number} value
   * @return {boolean}
   */
  findPlace(value) {
    let result = false;
    this._players.forEach( (user) => {
      if (user._place === value) {
        result = true;
      }
    });
    return result;
  }
  /**
   * @param {string} player id
   * @return {object|undefined}
   */
  findPlayer(player) {
    const gamer = this._players.get(player);
    if (!gamer) {
      return undefined;
    }
    return gamer;
  }
  /**
   * @param {string} userId
   */
  playersRegistery(userId) {
    this._players.set(userId, new User());
  }
  /**
   * @return {boolean}
   */
  checkReadiessPlayers() {
    const amountPlayers = 4;
    let counteRreadinessPlayers = 0;
    this._players.forEach( (user)=> {
      if (user._status === statuses.ready) {
        counteRreadinessPlayers++;
      }
    });
    if ( amountPlayers === counteRreadinessPlayers) {
      this._readinessPlayersToStart = true;
      return true;
    } else {
      return false;
    }
  }
  /**
   * give roles for players
   */
  giveRoleForPlayers() {
    // eslint-disable-next-line max-len
    let randomNumber = Math.floor(Math.random() * this._players.size);
    if (this._readinessPlayersToStart) {
      this._players.forEach((value) => {
        if (randomNumber === 0) {
          value._role = roles.mafia;
        } else {
          value._role = roles.peace;
        }
        randomNumber--;
      });
    }
  }
}
module.exports = {
  Game,
};
