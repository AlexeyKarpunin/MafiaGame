import React from 'react'

class Table extends React.Component {

  notReadyPlayer = (api) => {
    function readyClick () {
      api.changePlayerStatus('ready');
      api.changePlayerName(document.querySelector('.text-name-area').value)
      api.giveRolesForPlayers();
    }

    return (
      <div className="box-player">
         <div className="player-name">
           <input type="text" className="text-name-area" placeholder="write your name and push button >>>" autocomplete="new-password"></input>
           <button className="ready-button" onClick={readyClick}></button>
         </div>
     </div>
    )
  }
  
  readyPlayer = (state, className) => {
    return (
    <div className={className}>
        <div className="player-name">
            <div className="player-name">{state.name}</div>
        </div>
    </div>
    )
  }

  otherReadyPlayer = (player, className) => {
    return (
      <div className={className}>
           <div className="player-name">
               <div className="other-player">{player.name}</div>
           </div> 
      </div>
    )
  }

  otherPlayerNotReady = () => {
    return (
      <div className="box-player">
           <div className="player-name">
               <div className="other-player"></div>
           </div> 
      </div>
    )
  }

render () {
  const {api, state, placeNum} = this.props;
  if (state.place === placeNum + '') {
    switch (state.userStatus) {
      case 'ready':
        const ready = "box-player green-board";
        return this.readyPlayer(state, ready);
      case 'alive':
        const ussual = "box-player";
        return this.readyPlayer(state, ussual);
      case 'speaker':
        const blueBoard = "box-player blue-board"
        return this.readyPlayer(state, blueBoard);  
      default:
        return this.notReadyPlayer(api);
    }
  } else {
    const otherPlayer = state.players.filter(player => player.place === placeNum + '');
   if (otherPlayer.length === 1) {
     switch (otherPlayer[0].status) {
       case 'ready':
         const ready = "box-player green-board";
         return this.otherReadyPlayer(otherPlayer[0], ready);
       case 'alive' :
        const ussual = "box-player";
        return this.otherReadyPlayer(otherPlayer[0], ussual);
       case 'speaker':
        const blueBoard = "box-player blue-board"
         return this.otherReadyPlayer(otherPlayer[0], blueBoard);
       default:
         return this.otherPlayerNotReady();
     }
   }
   return this.otherPlayerNotReady();
  }
}
}

export default Table;