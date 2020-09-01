import React from 'react';
import './css/gameRoom.css'
import Table from './Table'

class Place extends React.Component {
constructor () {
  super();
  this.take = this.take.bind(this);
}

take(api, state) {
   function handleClick (e) {
     const target = e.target;
     if (target.classList.contains('take-place')) {
      const place = e.currentTarget.dataset;
      api.takePlace(place.place, state.userId)
     }
   }
   return (
    <div className="box-player" onClick={handleClick}>
         <button className="take-place">take place</button>
    </div>
   )
}

PlaceWasOccupated () {
  return (
    <div className="box-player">
         <button className="take-place"></button>
    </div>
  )
}

  render () {
    const {state, api, placeNum} = this.props;
    if (!state.place) {
      const occupatedPlace = state.players.filter(player => player.place === placeNum + '');
      if (occupatedPlace.length === 1) {
        return this.PlaceWasOccupated();
      }
      return this.take(api, state);
    } else {
      return  <Table {...{state, placeNum, api}} /> //this.yourPlace(state, placeNum, api)
    }
  }
}
export default Place;