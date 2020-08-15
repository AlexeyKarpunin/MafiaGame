import React, {Component, Fragment} from 'react';
import startPage from './startPage'
import Game from './gameRoom';


const DEFAULT_STATE = {
  gameId: undefined,
  status: undefined,
  role: undefined,
  readinessPlayersToStart: false,
  userId: undefined,
  places: undefined,
}

class App extends Component {
  constructor () {
    super();
    this.switchForShowRole = false;
    this.state = {...DEFAULT_STATE};
  }
  
  startGame = async () => {
    const response = await fetch('/api/game', {method: 'POST'});
    const {gameId, game} = await response.json();
    const status = game._status;
    const places = game._places;
    this.setState({gameId, status, places});
  }

  connectToGame = async () => {
    const id = document.querySelector('.text-gameId').value;
    const response = await fetch(`/api/game/${id}`, {method: 'GET'});
    const {game, gameId} = await response.json();
    const status = game._status;
    const places = game._places;
    this.setState({status, gameId, places});
  }

  takePlace = async (player) => {
    const response = await fetch(`/api/game/${this.state.gameId}/place`, 
  {
    method: 'PUT', 
    headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify(player)
  })
    const {userId, game} = await response.json()
    const places = game._places
    this.setState({userId, places})
  }
  changeName = async (place) => {
    const body = {
      newName: document.querySelector('.text-name-area').value,
      userId: this.state.userId,
      place: place.place
    };
    const response = await fetch(`/api/game/${this.state.gameId}/userName`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    })
    const {game} = await response.json();
    const places = game._places;
    this.setState({places})
  }
  
  changeStatusOnReady = async (place) => {
    const response = await fetch(`/api/game/${this.state.gameId}/status`, {
      method: 'PUT',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({userId: this.state.userId, status: true, place: place.place})
    });
    const {game} = await response.json();
    const places = game._places;
    this.setState({places})
  }

  checkPlayersReadiness = async () => {
    const response = await fetch(`/api/game/${this.state.gameId}/check`, {method: 'GET'});
    console.log(response.status)
    if (response.status === 200) { 
      const giveRoleResponse = await fetch(`/api/game/${this.state.gameId}/roles`, {method: 'PUT'});
      const {game} = await giveRoleResponse.json()
      const places = game._places;
      const readinessPlayersToStart = true;
      this.setState({places, readinessPlayersToStart});
    }
  }
  showRole = async () => {
    const response = await fetch(`/api/game/${this.state.gameId}/roles`, {
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({userId: this.state.userId})
    });
    const {role} = await response.json();
    this.setState({role})
  }
  callShowRole (switchForShowRole, readinessPlayersToStart, showRole) {
    if(!switchForShowRole && readinessPlayersToStart) {
      showRole()
      switchForShowRole = true;
    }
  }
  render() {
    
    const {gameId, userId, places, role, readinessPlayersToStart} = this.state;
    const {switchForShowRole, startGame, connectToGame, takePlace, changeName, changeStatusOnReady, checkPlayersReadiness, callShowRole, showRole} = this;

    return (
      <Fragment>
      <div className="Wrraper">
        <div className="content">
          { !gameId ? startPage(startGame, connectToGame) : <Game {...{takePlace, gameId, userId, places, changeName, changeStatusOnReady, checkPlayersReadiness, role}}/> }
        </div>
        {callShowRole(switchForShowRole, readinessPlayersToStart, showRole)}
        {console.log(this.state)}
      </div>
      </Fragment>
    );
  }
  }





export default App;
