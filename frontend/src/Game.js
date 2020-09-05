import React from 'react'
import './css/gameRoom.css'
import Place from './Place'

class Game extends React.Component {

  addDataAtributes () {
    const placesArray = Array.from(document.querySelectorAll('.box-player'))
    let counter = 1;
    placesArray.forEach( place => {
      place.dataset.place = counter++;
    });
  }

  render () {
    const {state, api} = this.props;
    let counter = 0;
    let classNamePlayers = "players" ;
    let classNamePlayerBox = "players-box";
    let number = Number(state.mafia) + Number(state.civilian)

    switch (number) {
      case 6:
        classNamePlayers += " sixth-players";
        classNamePlayerBox += " players-box-six";
        break;
      case 9:
        classNamePlayers += " ninth-players";
        classNamePlayerBox += " players-box-nine";
        break;
      default:
        classNamePlayers += " fouth-players";
        classNamePlayerBox += " players-box-four";
    }

    return (
      <div className="room">
        <div className="room-box-players">
    <div className="room-id" onClick={console.log(state)}>Game id: {state.gameId} You role: {state.role} Timer: {state.timer}</div>
          <div className={classNamePlayerBox}>
            <div className={classNamePlayers}>
              { state.arrayOfPlacesForGame.map( value => {
                counter++;
                this.addDataAtributes();
                return <Place {...{state, api, placeNum: counter}}/>
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
  


export default Game;