import React, {Component} from 'react';
import "./css/gameRoom.css"


function take (numberPlace, takePlace) {
  function handleClick(e) {
    e.preventDefault();
    takePlace(numberPlace)
  };
  return (
    <div className="box-player">
       <button className="take-place" onClick={handleClick}>take place</button>
    </div>
  );
};

 function notReadyPlayer (changeUserName, changeUserStatus, checkReadiessPlayers, readinessPlayersToStart, giveRolesForPlayers) {
  function handleClick(e) {
    e.preventDefault();
    const target = e.target
    if(target.classList.contains('ready-button')) {
      changeUserName();
      changeUserStatus();
      e.currentTarget.classList.add('green-board');
      checkReadiessPlayers();
      }
    }
  
  return (
    <div className="box-player" onClick={handleClick}>
       <div className="player-name">
         <input type="text" className="text-name-area" placeholder="write your name and push button >>>" autocomplete="new-password"></input>
         <button className="ready-button"></button>
       </div>
</div>
  )
}

class Place extends Component {
  constructor (props) {
    super();
    this.state = {
      name: undefined,
      gameId: props.gameId,
      place: props.numberPlace,
      status: undefined,
      placeStatus: false,
    }

    this.findName = this.findName.bind(this);
    this.findStatus = this.findStatus.bind(this);
    this.findPlace = this.findPlace.bind(this);
  }
  componentDidMount() {

    this.CheckingPlaceStatus = setInterval(
      () => this.findPlace(),
      1000
    );
  
    this.changerName = setInterval(
      () => this.findName(),
      1000
    );
  
    this.changerStatus = setInterval(
      () => this.findStatus(),
      1000
    );

  }
  componentWillUnmount() {
    clearInterval(this.changerName);
    clearInterval(this.changerStatus);
    clearInterval(this.CheckingPlaceStatus);
  }

  findName = async () => {
    const response = await fetch(`/api/name?gameId=${this.state.gameId}&place=${this.state.place}`, {
      method: 'GET',
    })
    const {name} = await response.json();
    if (name) {
      this.setState({name})
    }
  }
  findStatus = async () => {
    const response = await fetch(`/api/status?gameId=${this.state.gameId}&place=${this.state.place}`, {
      method: 'GET',
    })
    const {status} = await response.json();
    if (status) {
      this.setState({status})
    }
  }
  findPlace = async () => {
    const response = await fetch(`/api/place?gameId=${this.state.gameId}&place=${this.state.place}`, {
      method: 'GET',
    })
    const {placeStatus} = await response.json();
    if (placeStatus) {
      this.setState({placeStatus})
    }
  }
  
  render () {
    const {name, placeStatus} = this.state;
    const {place, takePlace, numberPlace, changeUserName, changeUserStatus, checkReadiessPlayers, readinessPlayersToStart, giveRolesForPlayers} = this.props;

    if (place === undefined) {
      if (!placeStatus) {
        return take(numberPlace, takePlace)
      } else {
        return (
      <div className="box-player">
          <div className="player-name">
              <div className="other-player">{name}</div>
          </div> 
     </div>
        )
      }
      
    } else if (place === numberPlace) {
      return notReadyPlayer(changeUserName, changeUserStatus, checkReadiessPlayers, readinessPlayersToStart, giveRolesForPlayers);
    } else {
      if (!this.state.status) {
        return (
      <div className="box-player">
           <div className="player-name">
               <div className="other-player">{name}</div>
           </div> 
      </div>
        )
      } else {
        return (
      <div className="box-player green-board">
           <div className="player-name">
               <div className="other-player">{name}</div>
           </div> 
      </div>
          )
      }
      
    }
  }
}


export default Place