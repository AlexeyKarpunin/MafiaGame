import React, {Fragment} from 'react';
import StartPage from './startPage';
import Api from './API';
import Game from './Game';
import './css/night.css'

function generateId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0; const v = c === 'x' ? r : (r && 0x3 | 0x8);
    return v.toString(16);
  });
};

const DEFAULT_STATE = {
  // game
  gameId: undefined,
  gameStatus: undefined,
  civilian: undefined,
  mafia: undefined,
  arrayOfPlacesForGame: [],
  players: [],
  timer: undefined,
  // user
  userId: undefined,
  userStatus: undefined,
  token: undefined,
  place: undefined,
  role: undefined,
}

class App extends Api {
  constructor () {
    super();
    this.state = {...DEFAULT_STATE};
  }

  componentDidMount() {
      this.takeInfoAboutGame = setInterval(
        () => this.gameInfo(),
        1000
      );
  }

  componentWillUnmount() {
      clearInterval(this.takeInfoAboutGame);
  }

  gameInfo = async () => {
    if (this.state.gameId) {
       const response = await fetch(`/api/games/${this.state.gameId}/info`, {
         method: 'GET',
         headers: {'Authorization': this.state.token}
        });
       const {players, civilian, mafia, gameStatus, role, userStatus, timer} = await response.json();
       this.setState({players, civilian, mafia, gameStatus, role, userStatus, timer})
    }
  }
  
  render() {
    const {userId, gameId} = this.state;
    const {api, state} = this;
    
    return (
      <Fragment>
        {!userId ? this.setState({userId: generateId()}) : null}
      <div className="Wrraper"> 
        <div className="content">
    {!gameId ? <StartPage {...{api, state}}/> : <Game {...{state, api}} /> }
        </div>
      </div>
      </Fragment>
    );
  }
}

export default App;
