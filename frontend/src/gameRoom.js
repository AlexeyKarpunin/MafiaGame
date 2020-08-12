import React, {Component} from 'react';
import "./css/gameRoom.css"

function Place ({places, takePlace, userId, place, changeName}) {
  if(!places[place].id && !userId) {
    return (
      <div className="box-player1">
         <button className="take-place" onClick={takePlace.bind(undefined, {place})}>take place</button>
      </div>
    )
  } else if (places[place].id === userId) {
    return (
      <div className="box-player1">
        <div className="player-name">
            <input type="text" className="text-name-area" placeholder="write your name and push button >>>" autocomplete="new-password"></input>
            <button className="ready-button" onClick={changeName.bind(undefined, {place})}></button>
        </div> 
      </div>
    )
  } else {
    return (
      <div className="box-player1">
        <div className="player-name">
             <div className="other-player">{places[place].name}</div>
            <button className="ready-button"></button>
        </div> 
      </div>
    )
  }
}


class Game extends Component {

  render() {
    const {gameId, takePlace, userId, places, changeName} = this.props
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
            <div className="role">Role</div>
          </div>
        </div>
        <div className="room-box-players">
    <div className="room-id">Game id: {gameId}</div>
          <div className="players-box">
            <div className="players">
              <Place {...{takePlace, userId, places, place: 'player1', changeName}}/>
              <Place {...{takePlace, userId, places, place: 'player2', changeName}}/>
              <Place {...{takePlace, userId, places, place: 'player3', changeName}}/>
              <Place {...{takePlace, userId, places, place: 'player4', changeName}}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Game;