/* eslint-disable global-require */
/* eslint-disable no-undef */
const request = require('supertest');
let server;

describe('/api/account', () => {
  beforeEach(() => {
    server = require('../../../index');
  });
  afterEach(() => {
    server.close();
  });

  describe('login /', () => {
    it('should return text saying "email" is required', async () => {
      const res = await request(server).post('/api/account/login');
      expect(res.res.text).toBe('"email" is required');
    });
  });
});
