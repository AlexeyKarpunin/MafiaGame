import React, {Component} from 'react';
import './App.css';

const DEFAULT_STATE = {
  gameId: undefined,
  status: undefined,
}

class App extends Component {
  constructor () {
    super();
    this.state = {...DEFAULT_STATE};
  }
  
  startGame = async () => {
    const response = await fetch('/api/game', {method: 'POST'});
    const {gameId} = await response.json();
    this.setState({gameId});
    console.log(gameId)
  }
  connectTogame = async () => {
    const gameId = document.querySelector('.Text-gameId').value;
    const response = await fetch(`/api/game/${gameId}`, {method: 'GET'});
    const {game} = await response.json();
    const status = game._status;
    this.setState({status});
    console.log(status)
  }
  render() {
    const {gameId} = this.state;
    const {startGame, connectTogame} = this;
    const content = <div>Game was started</div>
    const startPage = <div>Game was not started
      <button className="start-game" onClick={startGame}>Start Game</button>
      <input type="text" className="Text-gameId"></input><button className="start-game" onClick={connectTogame}>Connect to game</button>
      </div>
    return (
      <React.Fragment>
      <div className="Wrraper">
        <div className="content">
          { !gameId ? startPage : content }
        </div>
      </div>
      </React.Fragment>
    );
  }
  }




export default App;
