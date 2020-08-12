
const config = {
  secret: 'TokenSecretKey',
  status: {
    ready: 'ready',
    notReady: 'Not ready',
    created: 'created',
  },
  gameSetForFourthPlayers: {
    players: 4,
    mafia: 'mafia',
    peace: 'peace',
    places: {
      'player1': {
        id: undefined,
        connectionStatus: false,
        readinessStatus: false,
        name: '',
      },
      'player2': {
        id: undefined,
        connectionStatus: false,
        readinessStatus: false,
        name: '',
      },
      'player3': {
        id: undefined,
        connectionStatus: false,
        readinessStatus: false,
        name: '',
      },
      'player4': {
        id: undefined,
        connectionStatus: false,
        readinessStatus: false,
        name: '',
      },
    },
  },
  messages: {
    PlayerNotFound: 'Player was not found',
  },
};

module.exports = {
  config,
};
