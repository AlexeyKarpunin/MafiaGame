const {GameRegister} = require('../GameRegister');
describe('Good test for register', () => {
  const register = new GameRegister();
  const id = '0221685';
  const game = {status: 'started'};
  test('Game was registred', () => {
    expect(register.register(id, game)).toEqual(true);
  });
  test('Game was fined', () => {
    expect(register.find(id)).toEqual(game);
  });
});

describe('Bad test for register', () => {
  const register = new GameRegister();
  const id = '0221685';
  const falseId = '0221686';
  const game = {status: 'started'};
  register.register(id, game);
  test('Second register for same game', () => {
    expect(register.register(id, game)).toEqual(false);
  });
  test('Found wrong Id', () => {
    expect(register.find(falseId)).toEqual(false);
  });
});

