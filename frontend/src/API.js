import React from "react";

class Api extends React.Component {
  constructor () {
    super();
    this.api = {

      startGame: async  () => {
        const response = await fetch('/api/game', {method: 'POST'});
        const {gameId} = await response.json();
        this.setState({gameId: gameId});
      },

      getToken: async  () => {
        const response = await fetch('/api/me/token', {
          method: 'POST',
          headers: {'Content-Type' : 'Application/json'},
          body: JSON.stringify({gameId: this.state.gameId , userId: this.state.userId})
        })
        const {token} = await response.json();
        this.setState({token});
      },

      connectToGame: async () => {
        const id = document.querySelector('.text-gameId').value;
        const response = await fetch(`/api/game/${id}`, {method: 'GET'});
        const {gameId, mafia, civilian} = await response.json()
        this.setState({gameId, mafia, civilian});
      },

      settingForGame: async (param1, param2) => {
        const response = await fetch(`/api/game/setting/${this.state.gameId}`, {
          method: 'PUT',
          headers: {'Content-Type': 'Application/json'},
          body: JSON.stringify({civilian: param1, mafia: param2})
        })
        const {civilian, mafia} = await response.json();
        this.setState({civilian, mafia});
      },

      cretePlacesForPlayers: (number) => {
        let arrayOfPlacesForGame = [];
        let counter = 0;
        while (counter !== number) {
          arrayOfPlacesForGame.push('0');
          counter++;
        }
        this.setState({arrayOfPlacesForGame})
      },

      addPlayerInBackend: async () => {
       const response = await fetch(`/api/game/addPlayers/${this.state.gameId}`, {method: 'PUT'});
       const {gameStatus} = await response.json();
       this.setState({gameStatus});
      },

      takePlace: async (placeNumber) => {
        const response = await fetch('/api/player/place', {
          method: 'PUT',
          headers: {'Authorization': this.state.token, 'Content-Type': 'Application/json'},
          body: JSON.stringify({placeNum: placeNumber})
        })
        const {place} = await response.json();
        this.setState({place})
      }
    }
  }
  
  
}

export default Api;