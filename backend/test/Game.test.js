const {Game} = require('../src/Game');
const {User} = require('../src/User');

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
  expect(game.findPlayer(invalidId)).toEqual(false);
});

