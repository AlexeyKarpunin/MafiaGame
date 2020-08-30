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

  addSetForTAble (number) {
    const table = document.querySelector('.players');
    const playersBox = document.querySelector('.players-box');

    if (number === 4) {
      table.classList.add('fouth-players');
      playersBox.classList.add('players-box-four');
    }

    if (number === 6) {
      table.classList.add('sixth-players');
      playersBox.classList.add('players-box-six');
    }

    if (number === 9) {
      table.classList.add('ninth-players');
      playersBox.classList.add('players-box-nine');
    }
  }

  render () {
    const {state, api} = this.props;
    let counter = 0;
    return (
      <div className="room">
        <div className="room-box-players">
    <div className="room-id">Game id: {state.gameId}</div>
          <div className="players-box">
            <div className="players">
              { state.arrayOfPlacesForGame.map( value => {
                counter++;
                this.addDataAtributes();
                return <Place {...{state, api, placeNum: counter}}/>
              })}
              {this.addSetForTAble(Number(state.mafia) + Number(state.civilian))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
  


export default Game;