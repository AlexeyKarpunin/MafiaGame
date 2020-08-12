import React, {Component, Fragment} from 'react';
import startPage from './startPage'
import Game from './gameRoom';

const DEFAULT_STATE = {
  gameId: undefined,
  status: undefined,
  userId: undefined,
  places: {
    "player1": {
      id: undefined,      
      connectionStatus: false,
      readinessStatus:false,
      name: '',
    },
    "player2": {
      id: undefined,      
      connectionStatus: false,
      readinessStatus:false,
      name: '',
    },
    "player3": {
      id: undefined,      
      connectionStatus: false,
      readinessStatus:false,
      name: '',
    },
    "player4": {
      id: undefined,      
      connectionStatus: false,
      readinessStatus:false,
      name: '',
    },
  }
}

class App extends Component {
  constructor () {
    super();
    this.state = {...DEFAULT_STATE};
  }
  
  startGame = async () => {
    const response = await fetch('/api/game', {method: 'POST'});
    const {gameId, game} = await response.json();
    const status = game._status;
    this.setState({gameId, status});
  }

  connectToGame = async () => {
    const id = document.querySelector('.text-gameId').value;
    const response = await fetch(`/api/game/${id}`, {method: 'GET'});
    const {game, gameId} = await response.json();
    const status = game._status;
    const places = game._places
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
      userId: this.state.userId
    };
    const responseUser = await fetch(`/api/game/${this.state.gameId}/userName`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    })
    const {player} = await responseUser.json();
    const body2 = {
      newName: player._name,
      player: place.place
    };
    const responseName = await fetch(`/api/game/${this.state.gameId}/name`, {
      method: 'PUT',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(body2),
    })
    
    const {game} = await responseName.json();
    const places = game._places;
    this.setState({places})
  }

  render() {
    const {gameId, userId, places} = this.state;
    const {startGame, connectToGame, takePlace, changeName} = this;

    return (
      <Fragment>
      <div className="Wrraper">
        <div className="content">
          { !gameId ? startPage(startGame, connectToGame) : <Game {...{takePlace, gameId, userId, places, changeName }}/> }
        </div>
        {console.log(this.state)}
      </div>
      </Fragment>
    );
  }
  }




export default App;
