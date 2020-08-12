const {status} = require('../src/config').config;
/**
 *  class user
 */
class User {
  /**
   * @param {string} _name
   * @param {string} _userId
   * @param {string} _status
   */
  constructor() {
    this._name = '';
    this._status = status.notReady;
    this._role = undefined;
    this._place = '';
  }
  /**
 * @param {string} newName
 */
  changeUserName(newName) { // испотльзуй SET в названии
    this._name = newName;
  }
  /**
   * @param {string} newStatus
   */
  changeUserStatus(newStatus) {
    this._status = newStatus;
  }
  /**
   * @param {string} place
   */
  changeUserPlace(place) {
    this._place = place;
  }
}

module.exports = {
  User,
};
