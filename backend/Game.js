/**
 * class Game with setting for game
 */
class Game {
  /**
   * this is constructor
   */
  constructor() {
    this._status = 'created';
    this._player1 = undefined;
    this._player2 = undefined;
    this._player3 = undefined;
    this._player4 = undefined;
  }
  /**
   * take place at the table
   * @param {object} player
   * This object whith setting for player {status, role, ...}
   * @return {boolean} false of true
   */
  takeplace(player) {
    if (player.place === 'player1' && this._player1 === undefined) {
      this._player1 = player;
      return true;
    } else if (player.place === 'player2' && this._player2 === undefined) {
      this._player2 = player;
      return true;
    } else if (player.place === 'player3' && this._player3 === undefined) {
      this._player3 = player;
      return true;
    } else if (player.place === 'player4' && this._player4 === undefined) {
      this._player4 = player;
      return true;
    } else {
      return false;
    }
  }
}
module.exports = {
  Game,
};
