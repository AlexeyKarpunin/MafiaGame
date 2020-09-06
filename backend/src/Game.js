const {statuses} = require('../../Api/statuses');
const {roles} = require('../../Api/roles');
const {Vote} = require('./Vote');

const DEFAULT_PLAYER = {
  free: true,
  userId: undefined,
  place: undefined,
  role: undefined,
  status: undefined,
  name: undefined,
};

/**
 * class Game has setting for game and logic of game
 */
class Game {
  /**
   * constructor ...
   */
  constructor() {
    this.timer = 5,
    this.gameStatus = statuses.created;
    this.civilian = undefined;
    this.mafia = undefined;
    this.players = [];
    this.arrayOfPlacesForGame = [];
    this.round = 1;
    this.index = 0;
    this.vote = undefined;
  }
  /**
   * this function take setting for game and change them
   * @param {string} civilian
   * @param {string} mafia
   * @return {Array}
   */
  gameSettings(civilian, mafia) {
    this.civilian = civilian;
    this.mafia = mafia;
    const arrayOfPlacesForGame = [];
    let counter = 0;
    while (counter !== Number(this.civilian) + Number(this.mafia)) {
      arrayOfPlacesForGame.push('0');
      counter++;
    }
    this.arrayOfPlacesForGame = arrayOfPlacesForGame;
    return this.arrayOfPlacesForGame;
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
  /**
   * @param {string} newStatus
   * @param {string} userId
   * @return {boolean}
   */
  changePlayerStatus(newStatus, userId) {
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].userId === userId) {
        this.players[i].status = newStatus;
        return true;
      }
    }
    return false;
  }
  /**
   * @param {string} newName
   * @param {string} userId
   * @return {boolean}
   */
  changePlayerName(newName, userId) {
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].userId === userId) {
        this.players[i].name = newName;
        return true;
      }
    }
    return false;
  }
  /**
   * @return {object}
   * the function check readiness of players
   * and give roles for all players if they are ready
   */
  giveRolesForPlayers() {
    const readiness = this.players.filter(
        (player) => player.status === statuses.ready);

    if (readiness.length === this.players.length) {
      this.gameStatus = statuses.start;
      let civilian = this.civilian;
      let mafia = this.mafia;
      const randomNumber = Math.floor(Math.random() * 2);
      this.players.forEach( (player) => {
        if (randomNumber === 0) {
          if (mafia !== 0) {
            player.role = roles.mafia;
            player.status = statuses.alive;
            mafia--;
          } else {
            player.role = roles.peace;
            player.status = statuses.alive;
            civilian--;
          }
        }

        if (randomNumber === 1) {
          if (civilian !== 0) {
            player.role = roles.peace;
            player.status = statuses.alive;
            civilian--;
          } else {
            player.role = roles.mafia;
            player.status = statuses.alive;
            mafia--;
          }
        }
      });
      this.speakRound();
      return {message: 'Players have roles'};
    }
    return {message: 'Not all players ready'};
  }
  /**
   * this function start the timer and give opportunity for speak every players
   */
  speakRound() {
    this.gameStatus = statuses.speakRound;
    if (this.players[this.index].status !== statuses.dead) {
      this.players[this.index].status = statuses.speaker;
      const int = setInterval( () => {
        this.timer--;
        if (this.timer === 0) {
          this.players[this.index].status = statuses.alive;
          this.index++;
          this.timer = 5;
          clearInterval(int);
          if (this.index < this.players.length) {
            this.speakRound();
          } else {
            this.index = 0;
            if (this.round % 2 === 0) {
              this.voteCivilian();
            } else {
              this.voteMafia();
            }
          }
        }
      }, 1000);
    }
  }
  /**
   * 
   */
  voteMafia() {
    this.gameStatus = statuses.night;
    this.vote = new Vote();
    this.vote.addPlayerOnVote(this.players);
    const int = setInterval( () => {
      this.timer--;
      if (this.timer === 0) {
        this.timer = 5;
        clearInterval(int);
        const result = this.vote.checkPlayersOnDead();
        if (result === false || result === undefined) {
          this.voteMafia();
        } else {
          for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].userId === result[0]) {
              this.players[i].status = statuses.dead;
            }
          }
          this.round++;
          this.speakRound();
        }
      }
    }, 1000);
  }
  /**
   * 
   */
  voteCivilian() {

  }
  /**
   * 
   */
  voting(name) {
    for (let i = 0; i < this.players.length; i++) {
      if (name === this.players[i].name) {
        this.vote.playersOnVote.set(this.players[i].userId, this.vote.playersOnVote.get(this.players[i].userId) + 1);
      }
    }
  }
};

module.exports = {
  Game,
};
