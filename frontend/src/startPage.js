import React from 'react';
import './css/startPage.css'
import './css/menuSetupGame.css'
import gear from './img/gear.png'

class Startpage extends React.Component {
  constructor () {
    super();
    this.state = {
      menuSetupGame: false,
      mafia: 1,
      civilian: 3,
    };
    this.startClick = this.startClick.bind(this);
    this.connectToGameClick = this.connectToGameClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.menu = this.menu.bind(this);
  }

  menu () {
    return (
      <div className="menu-setup">
        <div className="buttons">
           <button className="button" data-civilian='3' data-mafia='1' onClick={this.handleClick}>4 players 1 mafia</button>
           <button className="button" data-civilian='5' data-mafia='1' onClick={this.handleClick}>6 players 1 mafia</button>
           <button className="button" data-civilian='7' data-mafia='2' onClick={this.handleClick}>9 players 2 mafia</button>
        </div>
      </div>
    );
  }

  startClick (api) {
    const {civilian, mafia} = this.state;
    async function click () {
      await api.startGame();
      await api.settingForGame(civilian, mafia);
      await api.cretePlacesForPlayers(Number(civilian) + Number(mafia));
      await api.addPlayerInBackend();
      api.getToken();
    }
    click();
  }

  connectToGameClick (api) {
    const {civilian, mafia} = this.state;
    async function click () {
      await api.connectToGame();
      api.cretePlacesForPlayers(Number(civilian) + Number(mafia));
      api.getToken();
    }
    click();
  }

  handleClick (e) {
    if (e.target.classList.contains('button')) {
     const civilian = e.target.dataset.civilian;
     const mafia = e.target.dataset.mafia;
     this.setState({civilian, mafia})
    }
    this.setState( state => ({menuSetupGame: !state.menuSetupGame}));
  }
  
    render () {
      const {api} = this.props;
      const {startClick, connectToGameClick, menu} = this;
      const {menuSetupGame} = this.state;
      const buttonMenuSetup = <button className="setup-button" onClick={this.handleClick}><img alt='gear' src={gear} className='gear'></img></button>
      
      return (
        <div className="start-box">
          <h1 className="start-header">Hello, welcome to mafia game</h1>
          {!menuSetupGame ? buttonMenuSetup : menu()}
          <div className="start-buttons">
               <button className="start-game" onClick={startClick.bind(this, api)}>Start Game</button>
                   <input type="text" className="text-gameId" placeholder="write the id of game here"></input>
               <button className="connect-to-game" onClick={connectToGameClick.bind(this, api)}>Connect to game</button>
          </div>
        </div>
      )
    }
}

export default Startpage;