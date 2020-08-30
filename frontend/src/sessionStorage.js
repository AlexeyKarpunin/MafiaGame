import API from "./API";

class SessionStorage extends API {
  constructor () {
    super();
    this.checkSessionStorage = this.checkSessionStorage.bind(this);
  }

  checkSessionStorage = () => {

    if (sessionStorage.getItem('gameId')) {
      const gameId = sessionStorage.getItem('gameId');
      this.setState({gameId})
    }
    
    if (sessionStorage.getItem('userId')) {
      const userId = sessionStorage.getItem('gameId');
      this.setState({userId})
    }

    if (sessionStorage.getItem('token')) {
      const token = sessionStorage.getItem('token');
      this.setState({token})
    }
  }
}


export default SessionStorage;