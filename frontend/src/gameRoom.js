import React, {Component} from 'react';
import "./css/gameRoom.css"


function Place ({places, takePlace, userId, place, changeName, changeStatusOnReady, handleClick, checkPlayersReadiness}) {
const NotReadyPlayer = <div className="box-player" onClick={handleClick}>
  <div className="player-name">
      <input type="text" className="text-name-area" placeholder="write your name and push button >>>" autocomplete="new-password"></input>
      <button className="ready-button" onClick={ () => {changeName({place}); changeStatusOnReady({place}); checkPlayersReadiness()}}></button>
  </div>
</div>

const readyPlayer = <div className="box-player">
   <div className="player-name">
<div className="other-player">{places[place].name}</div>
   </div>
</div>

  if(!places[place].id && !userId) {
    return (
      <div className="box-player">
         <button className="take-place" onClick={takePlace.bind(undefined, {place})}>take place</button>
      </div>
    )
  } else if (places[place].id === userId) {
    if(!places[place].readinessStatus) {
      return NotReadyPlayer
    } else {
      return readyPlayer
    }
  } else {
    if(places[place].readinessStatus === true) {
      return (
        <div className="box-player green-board">
          <div className="player-name">
               <div className="other-player">{places[place].name}</div>
          </div> 
        </div>
      )
    } else {
      return (
        <div className="box-player">
          <div className="player-name">
               <div className="other-player">{places[place].name}</div>
          </div> 
        </div>
      )
    }
    
  }
}

class Game extends Component {
  
  handleClick (e) {
    const target = e.target
    if(target.classList.contains('ready-button')) {
      e.currentTarget.style.border = '2px green solid';
    }
  }
  
  render() {
    const {handleClick} = this;
    const {gameId, takePlace, userId, places, changeName, changeStatusOnReady, checkPlayersReadiness, role} = this.props
    return (
      <div className="room">
        <div className="room-box-chat">
          <div className="taimer">Taimer</div>
          <div className="chat">
            <div className="cahts">
              <button className="peace-chat">Peace Chat</button>
              <button className="mafia-chat">Mafia Chat</button>
            </div>
            <div className="message-area"></div>
            <div className="message">
              <input type="text" className="text-area"></input>
              <button>Send</button>
            </div>
                   <div className="role">{role}</div>
          </div>
        </div>
        <div className="room-box-players">
    <div className="room-id">Game id: {gameId}</div>
          <div className="players-box">
            <div className="players">
              <Place {...{takePlace, userId, places, place: 'player1', changeName, changeStatusOnReady, handleClick, checkPlayersReadiness}}/>
              <Place {...{takePlace, userId, places, place: 'player2', changeName, changeStatusOnReady, handleClick, checkPlayersReadiness}}/>
              <Place {...{takePlace, userId, places, place: 'player3', changeName, changeStatusOnReady, handleClick, checkPlayersReadiness}}/>
              <Place {...{takePlace, userId, places, place: 'player4', changeName, changeStatusOnReady, handleClick, checkPlayersReadiness}}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Game;