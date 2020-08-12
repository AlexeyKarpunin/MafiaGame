const {Game} = require('../src/Game');
const {User} = require('../src/User');
const {status, messages} = require('../src/config').config;

test('takePlace function', () => {
  const game = new Game();
  const user = new User();
  const userId = '123456789';
  expect(game.takePlace(userId, user, 'player1')).toEqual(true);
  expect(game.takePlace(userId, user, 'player1')).toEqual(false);
});

test('findPlayer function', () => {
  const game = new Game();
  const user = new User();
  const userId = '123456789';
  const invalidId = 'd18c41y1d31';
  game.takePlace(userId, user, 'player1');
  expect(game.findPlayer(userId)).toEqual(user);
  expect(game.findPlayer(invalidId)).toEqual(messages.PlayerNotFound);
});

test('checkingPlayersForReadiness function and givingRoleForPlayers', () => {
  const game = new Game();
  const users = {
    user1: {
      user: new User(),
      userId: '1',
    },
    user2: {
      user: new User(),
      userId: '2',
    },
    user3: {
      user: new User(),
      userId: '3',
    },
    user4: {
      user: new User(),
      userId: '4',
    },
  };
  game.takePlace(users.user1.userId, users.user1.user, 'player1');
  game.takePlace(users.user2.userId, users.user2.user, 'player2');
  game.takePlace(users.user3.userId, users.user3.user, 'player3');
  game.takePlace(users.user4.userId, users.user4.user, 'player4');
  game.findPlayer(users.user1.userId).changeUserStatus(status.ready);
  game.findPlayer(users.user2.userId).changeUserStatus(status.ready);
  game.checkPlayersForReadiness();
  expect(game._readinessPlayersToStart).toEqual(false);
  game.findPlayer(users.user3.userId).changeUserStatus(status.ready);
  game.findPlayer(users.user4.userId).changeUserStatus(status.ready);
  game.checkPlayersForReadiness();
  expect(game._readinessPlayersToStart).toEqual(true);
  game.giveRoleForPlayers();
  const user1 = game.findPlayer('1');
  const user2 = game.findPlayer('2');
  const user3 = game.findPlayer('3');
  const user4 = game.findPlayer('4');
  const chakingUser1 = user1._role === 'peace' || user1._role === 'mafia';
  const chakingUser2 = user2._role === 'peace' || user2._role === 'mafia';
  const chakingUser3 = user3._role === 'peace' || user3._role === 'mafia';
  const chakingUser4 = user4._role === 'peace' || user4._role === 'mafia';
  expect(chakingUser1).toEqual(true);
  expect(chakingUser2).toEqual(true);
  expect(chakingUser3).toEqual(true);
  expect(chakingUser4).toEqual(true);
});

