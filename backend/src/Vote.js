const {roles} = require('../../Api/roles');
const {statuses} = require('../../Api/statuses');
/**
 * class
 */
class Vote {
  /**
   * constructor
   */
  constructor() {
    this.playersOnVote = new Map();
  }
  /**
   * 
   * @param {array} players
   */
  addPlayerOnVote(players) {
    for (let i = 0; i < players.length; i ++) {
      if (players[i].status !== statuses.dead) {
        this.playersOnVote.set(players[i].userId, 0);
      }
    }
  }
  /**
   * 
   */
  checkPlayersOnDead() {
    const players = Array.from(this.playersOnVote);
    const sameVote = [];
    let max = 0;
    for (let i = 0; i < players.length; i++) {
      if (players[i][1] > max) {
        max = players[i][1];
      }
    }
    for (let i = 0; i < players.length; i++) {
      if (players[i][1] === max) {
        sameVote.push(players[i]);
      }
    }
    if (sameVote.length === 1) {
      return sameVote[0];
    } else {
      return false;
    }
  }
}


module.exports = {
  Vote,
};
