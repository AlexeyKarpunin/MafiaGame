const request = require('supertest');
const jwt = require('jsonwebtoken');
const {app} = require('../app');

test('test of test', async () => {
  const req = await request(app).get('/api/test');
  expect(req.body).toEqual({message: 'success'});
});

test('testing /api/game method: POST', async () => {
  const req = await request(app).post('/api/game');
  expect(req.status).toEqual(201);
  expect(req.body.token).not.toBeUndefined();
});

describe('testing /api/game method: GET', () => {
  test('Good id', async () => {
    const req = await request(app).post('/api/game');
    const tokenForDecod = req.body.token;
    const decoded = jwt.decode(tokenForDecod);
    const {id} = decoded;
    const body = {
      'gameId': id,
    };
    const getReq = await request(app).get('/api/game').send(body);
    const info = await getReq;
    expect(info.status).toEqual(201);
    expect(info.body.token).not.toBeUndefined();
  });

  test('Bad id', async () => {
    const body = {
      'gameId': 'fhdf8237837foax836rhc203',
    };
    const getReq = await request(app).get('/api/game').send(body);
    const {status} = await getReq;
    expect(status).toEqual(404);
  });
});
