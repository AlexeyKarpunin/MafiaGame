
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
}

module.exports = {
  Game,
};
