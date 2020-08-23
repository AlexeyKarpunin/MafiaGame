import React, {Component} from 'react';
import Place from './Place'

class Game extends Component {
  render() {
    const {gameId, role, place, takePlace, changeUserName, changeUserStatus, findName, checkReadiessPlayers, readinessPlayersToStart, giveRolesForPlayers} = this.props
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
              <Place {...{numberPlace: 1, place, takePlace, changeUserName, changeUserStatus, findName, gameId, checkReadiessPlayers, readinessPlayersToStart, giveRolesForPlayers}}/>
              <Place {...{numberPlace: 2, place, takePlace, changeUserName, changeUserStatus, findName, gameId, checkReadiessPlayers, readinessPlayersToStart, giveRolesForPlayers}}/>
              <Place {...{numberPlace: 3, place, takePlace, changeUserName, changeUserStatus, findName, gameId, checkReadiessPlayers, readinessPlayersToStart, giveRolesForPlayers}}/>
              <Place {...{numberPlace: 4, place, takePlace, changeUserName, changeUserStatus, findName, gameId, checkReadiessPlayers, readinessPlayersToStart, giveRolesForPlayers}}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Game;
