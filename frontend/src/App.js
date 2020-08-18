import React, {Component, Fragment} from 'react';
import StartPage from './startPage'
import Game from './gameRoom';


const DEFAULT_STATE = {
  gameId: undefined,
  status: undefined,
  role: undefined,
  readinessPlayersToStart: false,
  userId: undefined,
  token: undefined
}

class App extends Component {
  constructor () {
    super();
    this.state = {...DEFAULT_STATE};

    this.startGame = this.startGame.bind(this);
    this.getToken = this.getToken.bind(this);
    this.registeryUser = this.registeryUser.bind(this);
  }
  
  startGame = async () => {
    const response = await fetch('/api/game', {method: 'POST'});
    const {gameId, game} = await response.json();
    sessionStorage.setItem('gameId', gameId);
    const status = game._status;
    this.setState({gameId, status});
  }

  getToken = async () => {
      const response = await fetch('/api/token', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({gameId: this.state.gameId, userId: this.state.userId})
       })
       const {token} = await response.json();
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

  checkSessionStorage = () => {
    if (sessionStorage.getItem('gameId')) {
      const gameId = sessionStorage.getItem('gameId');
      this.setState({gameId})
    }
    if (sessionStorage.getItem('userId')) {
      const userId = sessionStorage.getItem('gameId');
      this.setState({userId})
    }
  }

  render() {
    const {gameId} = this.state;
    const {startGame, getToken, registeryUser} = this;

    return (
      <Fragment>
      <div className="Wrraper">
        <div className="content">
          { !gameId ? this.checkSessionStorage() : null}
          { !gameId ? <StartPage {...{startGame, registeryUser, getToken}}/> : <Game {...{gameId}} /> }
        </div>
      </div>
      </Fragment>
    );
  }
}





export default App;
