import React from "react";

class Api extends React.Component {
  constructor () {
    super();
    this.api = {

      startGame: async  () => {
        const response = await fetch('/api/games', {method: 'POST'});
        const {gameId} = await response.json();
        this.setState({gameId: gameId});
      },

      getToken: async  () => {
        const response = await fetch('/api/me/token', {
          method: 'POST',
          headers: {'Content-Type': 'Application/json'},
          body: JSON.stringify({gameId: this.state.gameId , userId: this.state.userId})
        })
        const {token} = await response.json();
        this.setState({token});
      },

      connectToGame: async (id) => {
        const response = await fetch(`/api/games/${id}`, {method: 'GET'});
        const {mafia, civilian, arrayOfPlacesForGame, gameId} = await response.json()
        this.setState({mafia, civilian, arrayOfPlacesForGame, gameId});
      },

      settingForGame: async (param1, param2) => {
        const response = await fetch(`/api/games/${this.state.gameId}/setting`, {
          method: 'PUT',
          headers: {'Content-Type': 'Application/json'},
          body: JSON.stringify({civilian: param1, mafia: param2})
        })
        const {civilian, mafia, arrayOfPlacesForGame} = await response.json();
        this.setState({civilian, mafia, arrayOfPlacesForGame});
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
       const response = await fetch(`/api/games/${this.state.gameId}/players`, {method: 'POST'});
       const {gameStatus} = await response.json();
       this.setState({gameStatus});
      },

      takePlace: async (placeNumber) => {
        const response = await fetch('/api/players/place', {
          method: 'PUT',
          headers: {'Authorization': this.state.token, 'Content-Type': 'Application/json'},
          body: JSON.stringify({placeNum: placeNumber})
        })
        const {place} = await response.json();
        this.setState({place})
      },

      changePlayerStatus: async (status) => {
        const response = await fetch(`/api/players/${this.state.userId}/status`, {
          method: 'PUT',
          headers: {'Authorization': this.state.token, 'Content-Type': 'Application/json'},
          body: JSON.stringify({userId: this.state.userId, newStatus: status})
        })
        const {userStatus} = await response.json();
        this.setState({userStatus});
      },

      changePlayerName: async (newName) => {
        const response = await fetch(`/api/players/${this.state.userId}/name`, {
          method: 'PUT',
          headers: {'Authorization': this.state.token, 'Content-Type': 'Application/json'},
          body: JSON.stringify({userId: this.state.userId, newName: newName})
        })
        const {name} = await response.json();
        this.setState({name});
      },

      giveRolesForPlayers: async () => {
         await fetch(`/api/games/${this.state.gameId}/roles`, {method: 'PUT'});
      }
    }
  }
}

export default Api;