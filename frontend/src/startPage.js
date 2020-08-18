import React, {Component} from 'react';
import './css/startPage.css'

class StartPage extends Component {
  
startHandleClick = async (startGame, registeryUser, getToken) => {
    await startGame();
    await registeryUser();
    getToken();
}

 render () {
  const {startGame, getToken, registeryUser} = this.props;
  const {startHandleClick} = this;
  return (
    <div className="start-box">
      <h1 className="start-header">Hello, welcome to mafia game</h1>
      <div className="start-buttons">
           <button className="start-game" onClick={startHandleClick.bind(this, startGame, registeryUser, getToken)}>Start Game</button>
           <input type="text" className="text-gameId" placeholder="write the id of game here"></input>
           <button className="connect-to-game" >Connect to game</button>
      </div>
    </div>
  );
 }
}
 export default StartPage;

