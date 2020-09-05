const {roles} = require('../../Api/roles');
/**
 * class
 */
class Vote {
  /**
   * constructor
   */
  constructor() {
    this.playersOnVote = [];
  }
  /**
   * 
   * @param {array} players
   */
  addMafia(players) {
    for (let i = 0; i < players.length; i++) {
      if (players[i].role === roles.peace) {
        players[i].counter = 0;
        this.playersOnVote.push(players[i]);
      }
    }
  }
  /**
   * 
   * @param {array} players
   */
  addCivilian(players) {
    for (let i = 0; i < players.length; i++) {
      players[i].counter = 0;
      this.playersOnVote.push(players[i]);
    }
  }
  /**
   * 
   */
  checkPlayersOnDead() {
    let result = [];
    for ( let i = 0; i < this.playersOnVote.length; i++) {
      
    }
  }
}


module.exports = {
  Vote,
};
