import {Component} from 'react'

class API extends Component {

  constructor () {
    super();
    this.startGame = this.startGame.bind(this);
    this.getToken = this.getToken.bind(this);
    this.registeryUser = this.registeryUser.bind(this);
    this.connectToGame = this.connectToGame.bind(this);
    this.changeUserName = this.changeUserName.bind(this);
    this.changeUserStatus = this.changeUserStatus.bind(this);
    this.takePlace = this.takePlace.bind(this);
    this.checkReadiessPlayers = this.checkReadiessPlayers.bind(this);
    this.resiveRole = this.resiveRole.bind(this);
  }

  startGame = async () => {
    const response = await fetch('/api/game', {method: 'POST'});
    const {gameId} = await response.json();
    sessionStorage.setItem('gameId', gameId);
    this.setState({gameId});
  }

  getToken = async () => {
      const response = await fetch('/api/token', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({gameId: this.state.gameId, userId: this.state.userId})
       })
       const {token} = await response.json();
       sessionStorage.setItem('token', token);
       this.setState({token});
  }

  registeryUser = async () => {
    const response = await fetch('/api/user', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({gameId: this.state.gameId})
    })
    const {userId} = await response.json();
    sessionStorage.setItem('userId', userId);
    this.setState({userId});
  }

  connectToGame = async () => {
    const id = document.querySelector('.text-gameId').value;
    const response = await fetch(`/api/connect/${id}`, {method: 'GET'});
    const {gameId} = await response.json();
    sessionStorage.setItem('gameId', gameId);
    this.setState({gameId});
  }

  changeUserName = async () => {
    const response = await fetch(`/api/${this.state.gameId}/user/name`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({userId: this.state.userId, newName: document.querySelector('.text-name-area').value })
    })
    const {name} = await response.json();
    this.setState({name});
  }

  changeUserStatus = async () => {
    const response = await fetch(`/api/${this.state.gameId}/user/status`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({userId: this.state.userId, newStatus: 'ready' })
    })
    const {status} = await response.json();
    this.setState({status});
  }

  takePlace = async (value) => {
    const response = await fetch(`/api/${this.state.gameId}/user/place`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({userId: this.state.userId, place: value})
    })
    const {place} = await response.json();
    this.setState({place});
  }

  checkReadiessPlayers = async () => {
    const response = await fetch(`/api/readiness/${this.state.gameId}/`, {method: 'GET'})
    const {readinessPlayersToStart} = await response.json();
      this.setState({readinessPlayersToStart});
  }
  giveRolesForPlayers = async () => {
    const response = await fetch(`/api/${this.state.gameId}/roles`, {method: 'PUT'})
    const {message} = await response.json();
    console.log(message);
  }
  resiveRole = async () => {
    const response = await fetch(`/api/role?gameId=${this.state.gameId}&userId=${this.state.userId}`)
    const {role} = await response.json();
    this.setState({role});
  }
}

export default API;