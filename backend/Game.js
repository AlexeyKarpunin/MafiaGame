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
};

module.exports = {
  Game,
};
