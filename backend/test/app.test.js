const request = require('supertest');
const {app} = require('../app');

test('test of test', async () => {
  const req = await request(app).get('/api/test');
  expect(req.body).toEqual({message: 'success'});
});
