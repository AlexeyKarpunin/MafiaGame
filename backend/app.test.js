const request = require('supertest');
const {app} = require('./app');

test('test of test', () => {
  request(app)
      .get('/api/test')
      .expect({message: 'working'})
      .end();
});
