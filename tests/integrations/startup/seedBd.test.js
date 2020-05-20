/* eslint-disable global-require */
/* eslint-disable no-undef */
const { User } = require('../../../models/user');

describe('verify if admin user is created', () => {
  beforeEach(() => {
    server = require('../../../index');
  });
  afterEach(async () => {
    server.close();
  });

  it('Verify if admin user was created', async () => {
    const userAdmin = User.findOne({ email: 'userlogado@gmail.com' });

    expect(userAdmin).toBeTruthy();
  });
});
