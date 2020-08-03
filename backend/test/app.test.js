const request = require('supertest');
const {app} = require('../src/app');

let createGame;
let takePlace;
let invalidGameId;

beforeEach( async () => {
  invalidGameId = 'dasfioqr783sgb91dsa-w-ekd03131';
  createGame = await request(app).post('/api/game');
  takePlace = await request(app)
      .put(`/api/game/${createGame.body.gameId}/place`)
      .send({'place': 'player2'});
});

test('POST API /api/game create game', async () => {
  expect(createGame.status).toEqual(201);
});

test('GET API /api/game connect to game', async () => {
  const {gameId} = createGame.body;
  const get = await request(app).get('/api/game').send({'gameId': gameId});
  expect(get.status).toEqual(201);
  const badGet = await request(app).get('/api/game')
      .send({'gameId': 'cmashsaetweydasd'});
  expect(badGet.status).toEqual(404);
});

test('PUT API /api/game/:gameId/place take place on the table', async () => {
  expect(takePlace.status).toEqual(200);
  const BadPut = await request(app).put(`/api/game/${invalidGameId}/place`)
      .send({'place': 'player2'});
  expect(BadPut.status).toEqual(404);
});

test('PUT API /api/game/:gameId/name change user name', async () => {
  const put = await request(app)
      .put(`/api/game/${createGame.body.gameId}/name`)
      .send({'newName': 'Alex', 'userId': takePlace.body.userId});
  const badPutGameId = await request(app)
      .put(`/api/game/${invalidGameId}/name`)
      .send({'newName': 'Alex', 'userId': takePlace.body.userId});
  const badPutUserId = await request(app)
      .put(`/api/game/${createGame.body.gameId}/name`)
      .send({'newName': 'Alex', 'userId': 's1231fas1'});
  expect(put.status).toEqual(200);
  expect(badPutGameId.status).toEqual(404);
  expect(badPutUserId.status).toEqual(404);
});

test('PUT API /api/game/:gameId/status change user status', async () => {
  const put = await request(app)
      .put(`/api/game/${createGame.body.gameId}/status`)
      .send({'status': 'ready', 'userId': takePlace.body.userId});
  const badPutGameId = await request(app)
      .put(`/api/game/${invalidGameId}/name`)
      .send({'status': 'ready', 'userId': takePlace.body.userId});
  const badPutUserId = await request(app)
      .put(`/api/game/${createGame.body.gameId}/name`)
      .send({'status': 'ready', 'userId': 's1231fas1'});
  expect(put.status).toEqual(200);
  expect(badPutGameId.status).toEqual(404);
  expect(badPutUserId.status).toEqual(404);
});
