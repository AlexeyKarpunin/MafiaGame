import React from 'react';
import './css/gameRoom.css'

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

yourPlace (place, placeNum) {
    if (place === placeNum + '') {
      return (
<div className="box-player">
       <div className="player-name">
         <input type="text" className="text-name-area" placeholder="write your name and push button >>>" autocomplete="new-password"></input>
         <button className="ready-button"></button>
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
  render () {
    const {state, api, placeNum} = this.props;
    if (!state.place) {
      return this.take(api, state)
    } else {
      return this.yourPlace(state.place, placeNum)
    }
  }
}
export default Place;