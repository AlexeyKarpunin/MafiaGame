const {statuses} = require('../../Api/statuses');

const DEFAULT_PLAYER = {
  free: true,
  userId: undefined,
  place: undefined,
  role: undefined,
  status: undefined,
};

/**
 * class Game has setting for game and logic of game
 */
class Game {
  /**
   * constructor ...
   */
  constructor() {
    this.gameStatus = statuses.created;
    this.GameStatus = statuses.created;
    this.civilian = undefined;
    this.mafia = undefined;
    this.players = [];
  }
  /**
   * this function take setting for game and change them
   * @param {string} civilian
   * @param {string} mafia
   */
  gameSettings(civilian, mafia) {
    this.civilian = civilian;
    this.mafia = mafia;
  }
  /**
   * this function add players in array
   */
  addPlayers() {
    let players = Number(this.mafia) + Number(this.civilian);
    while (players !== 0) {
      this.players.push(Object.assign({}, DEFAULT_PLAYER));
      players--;
    }
  }
  /**
   * this function take place for player
   * @param {string} place
   * @param {string} userId
   * @return {object} message for app;
   */
  takePlace(place, userId) {
    const playersArray = this.players;
    /**
     * check the free place and return boolean
     * @return {boolean}
     */
    function helper() {
      for (let i = 0; i < playersArray.length; i++) {
        if (playersArray[i].place === place) {
          return false;
        }
      }
      return true;
    };
    if (helper()) {
      for (let i = 0; i < playersArray.length; i++) {
        if (playersArray[i].free) {
          playersArray[i].place = place;
          playersArray[i].userId = userId;
          playersArray[i].free = false;
          return {message: 'success', place: place};
        }
      }
      return {message: 'All places occupated'};
    }
    return {message: 'this place was occupated'};
  };
};

module.exports = {
  Game,
};
