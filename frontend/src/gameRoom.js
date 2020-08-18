import React, {Component} from 'react';
import "./css/gameRoom.css"


function Place ({handleClick}) {
const NotReadyPlayer = <div className="box-player" onClick={handleClick}>
  <div className="player-name">
      <input type="text" className="text-name-area" placeholder="write your name and push button >>>" autocomplete="new-password"></input>
      <button className="ready-button" onClick={ () => console.log('ready button')}></button>
  </div>
</div>

const readyPlayer = <div className="box-player">
   <div className="player-name">
<div className="other-player">{}</div>
   </div>
</div>
const show = true;

  if(show) {
    return (
      <div className="box-player">
         <button className="take-place" onClick={console.log('take place button')}>take place</button>
      </div>
    )
  } else if (!show) {
    if(!show) {
      return NotReadyPlayer
    } else {
      return readyPlayer
    }
  } else {
    if(!show) {
      return (
        <div className="box-player green-board">
          <div className="player-name">
               <div className="other-player"></div>
          </div> 
        </div>
      )
    } else {
      return (
        <div className="box-player">
          <div className="player-name">
               <div className="other-player"></div>
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
    const {gameId, role} = this.props
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
              <Place {...{handleClick}}/>
              <Place {...{handleClick}}/>
              <Place {...{handleClick}}/>
              <Place {...{handleClick}}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Game;