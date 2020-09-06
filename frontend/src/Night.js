import React from 'react'
import './css/night.css'

class Night extends React.Component {
  constructor(){
    super();
    this.state = undefined;
  }

  voteBox (state, api) {

    function handleClick (name) {
      console.log(name);
      api.vote(name);
    }

    return (
    <div className="voteBox">
      {state.players.map( (value) => {
          if (value.status === 'alive') {
            return <div className='name'><div>Name: {value.name}</div><button onClick={handleClick.bind(this, value.name)}>Vote</button></div>
          }
        })}
    </div>
    )
  }

  render () {
    const {state, api} = this.props;
    switch (state.role) {
      case 'Mafia':
        return this.voteBox(state, api);
      default:
        return <div className='nightBox'></div>
    }
  }
}

export default  Night;