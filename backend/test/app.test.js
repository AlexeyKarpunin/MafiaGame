const request = require('supertest');
const {app} = require('../src/app');
const {status} = require('../src/config').config;

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
  const get = await request(app).get(`/api/game/${gameId}`);
  expect(get.status).toEqual(201);
  const badGet = await request(app).get(`/api/game/${invalidGameId}`);
  expect(badGet.status).toEqual(404);
});

test('PUT API /api/game/:gameId/place take place on the table', async () => {
  expect(takePlace.status).toEqual(200);
  const BadPut = await request(app).put(`/api/game/${invalidGameId}/place`)
      .send({'place': 'player2'});
  expect(BadPut.status).toEqual(404);
});

test('PUT API /api/game/:gameId/name change user userName', async () => {
  const put = await request(app)
      .put(`/api/game/${createGame.body.gameId}/userName`)
      .send({'newName': 'Alex', 'userId': takePlace.body.userId});
  const badPutGameId = await request(app)
      .put(`/api/game/${invalidGameId}/userName`)
      .send({'newName': 'Alex', 'userId': takePlace.body.userId});
  const badPutUserId = await request(app)
      .put(`/api/game/${createGame.body.gameId}/userName`)
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
      .put(`/api/game/${invalidGameId}/userName`)
      .send({'status': 'ready', 'userId': takePlace.body.userId});
  const badPutUserId = await request(app)
      .put(`/api/game/${createGame.body.gameId}/userName`)
      .send({'status': 'ready', 'userId': 's1231fas1'});
  expect(put.status).toEqual(200);
  expect(badPutGameId.status).toEqual(404);
  expect(badPutUserId.status).toEqual(404);
});

test('GET API /api/game/:gameId/check checking readiness players', async () => {
  // first player
  const player1 = await request(app)
      .put(`/api/game/${createGame.body.gameId}/place`)
      .send({'place': 'player1'});
  const userIdForPlayer1 = player1.body.userId;
  await request(app)
      .put(`/api/game/${createGame.body.gameId}/status`)
      .send({'status': status.ready, 'userId': userIdForPlayer1});
  // bad gameId
  const badget = await request(app).
      get(`/api/game/${invalidGameId}/check`);
  expect(badget.status).toEqual(404);
  // second player
  await request(app)
      .put(`/api/game/${createGame.body.gameId}/status`)
      .send({'status': status.ready, 'userId': takePlace.body.userId});
  // third player
  const player3 = await request(app)
      .put(`/api/game/${createGame.body.gameId}/place`)
      .send({'place': 'player3'});
  const userIdForPlayer3 = player3.body.userId;
  await request(app)
      .put(`/api/game/${createGame.body.gameId}/status`)
      .send({'status': status.ready, 'userId': userIdForPlayer3});
  // Early request
  const getEarly = await request(app).
      get(`/api/game/${createGame.body.gameId}/check`);
  expect(getEarly.status).toEqual(304);
  // fourth player
  const player4 = await request(app)
      .put(`/api/game/${createGame.body.gameId}/place`)
      .send({'place': 'player4'});
  const userIdForPlayer4 = player4.body.userId;
  await request(app)
      .put(`/api/game/${createGame.body.gameId}/status`)
      .send({'status': status.ready, 'userId': userIdForPlayer4});
  const get = await request(app).
      get(`/api/game/${createGame.body.gameId}/check`);
  expect(get.status).toEqual(200);
});

test('PUT API /api/game/:gameId/roles give roles for players ', async () => {
  const {gameId} = createGame.body;
  const put = await request(app).put(`/api/game/${gameId}/roles`);
  const badPut = await request(app).put(`/api/game/${invalidGameId}/roles`);
  expect(badPut.status).toEqual(404);
  expect(put.status).toEqual(200);
});
