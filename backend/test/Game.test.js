const {Game} = require('../Game');

describe('TakePlace function', () => {
  test('place is free and if place was occupated', () => {
    const game = new Game();
    const player = {
      place: 'player2',
      status: 'not ready',
      role: undefined,
    };
    game.takeplace(player);
    expect(game._player2 === player).toEqual(true);
    expect(game.takeplace(player)).toEqual(false);
  });
});

