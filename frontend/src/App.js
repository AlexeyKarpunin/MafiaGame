import React, {Fragment} from 'react';
import StartPage from './startPage';
import Api from './API';
import Game from './Game';


function generateId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0; const v = c === 'x' ? r : (r && 0x3 | 0x8);
    return v.toString(16);
  });
};

const DEFAULT_STATE = {
  gameId: undefined,
  gameStatus: undefined,
  userId: undefined,
  token: undefined,
  civilian: undefined,
  mafia: undefined,
  arrayOfPlacesForGame: [],
  place: undefined
}

class App extends Api {
  constructor () {
    super();
    this.state = {...DEFAULT_STATE};
  }
  
  render() {
    const {userId, gameId} = this.state;
    const {api, state} = this;
    
    return (
      <Fragment>
        {!userId ? this.setState({userId: generateId()}) : null}
      <div className="Wrraper"> 
        <div className="content">
    {!gameId ? <StartPage {...{api}}/> : <Game {...{state, api}} /> }
        </div>
      </div>
      </Fragment>
    );
  }
}

export default App;
