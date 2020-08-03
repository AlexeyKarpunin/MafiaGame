/**
 * Register for games
 */
class GameRegister {
  /**
   * constructor with Map
   */
  constructor() {
    this._map = new Map();
  }
  /**
   * find the game by gameId and give this game
   * @param {string} id
   * @return {game} class Game
   */
  find(id) {
    if (this._map.has(id)) {
      return this._map.get(id);
    }
    return false;
  }
  /**
   * function registers the game in the _map;
   * @param {string} id
   * @param {game} game class Game
   * @return {boolean}
   */
  register(id, game) {
    if (this._map.has(id) && game !== undefined) {
      return false;
    }
    this._map.set(id, game);
    return true;
  }
};

module.exports = {
  GameRegister,
};
