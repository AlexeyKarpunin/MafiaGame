import React, {Fragment} from 'react';
import StartPage from './startPage'
import Game from './gameRoom';
import SessionStorage from './sessionStorage';


const DEFAULT_STATE = {
  gameId: undefined,
  status: undefined,
  role: undefined,
  readinessPlayersToStart: false,
  userId: undefined,
  token: undefined,
  place: undefined,
  name: undefined
}

class App extends SessionStorage {
  constructor () {
    super();
    this.state = {...DEFAULT_STATE};
  }
  componentDidMount() {
    this.resiveRoleofPlayer = setInterval(
      () => this.resiveRole(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.resiveRoleofPlayer);
  }


  render() {
    const {gameId, place, readinessPlayersToStart, role} = this.state;
    const {startGame, getToken, registeryUser, checkSessionStorage, connectToGame, takePlace, changeUserName, changeUserStatus, checkReadiessPlayers, giveRolesForPlayers} = this;

    return (
      <Fragment>
      <div className="Wrraper"> 
        <div className="content">
          { !gameId ? checkSessionStorage() : null }
          { !gameId ? <StartPage {...{startGame, registeryUser, getToken, connectToGame}}/> 
          :  <Game {...{role, gameId, takePlace, place, changeUserName, changeUserStatus, checkReadiessPlayers, readinessPlayersToStart, giveRolesForPlayers}} /> }
          {console.log(this.state)}
        </div>
      </div>
      </Fragment>
    );
  }
}





export default App;
