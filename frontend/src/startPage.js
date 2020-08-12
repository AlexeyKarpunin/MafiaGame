import React from 'react';
import './css/startPage.css'

function startPage(startGame, connectTogame) {
 return (
<div className="start-box">
  <h1 className="start-header">Hello, welcome to mafia game</h1>
  <div className="start-buttons">
       <button className="start-game" onClick={startGame}>Start Game</button>
       <input type="text" className="text-gameId" placeholder="write the id of game here"></input>
       <button className="connect-to-game" onClick={connectTogame}>Connect to game</button>
  </div>
</div>
 );
}
 export default startPage;

