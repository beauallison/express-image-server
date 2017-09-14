const _ = require('lodash');
const { server: { authentication } } = require('config');
const auth = require('./');

const request = (username, password) => ({
  headers: {
    authorization: `basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
  },
});

describe('auth', () => {
  it('should authenticate on correct credentials', () => {
    const req = request(authentication.name, authentication.pass);
    auth(req, _.noop, (next) => {
      expect(next).toBeUndefined();
    });
  });

  it('should throw Unauthorized error on bad credentials', () => {
    const req = request('bad', 'creds');
    auth(req, _.noop, (next) => {
      expect(next.isBoom).toBe(true);
      expect(next.output).toEqual({
        statusCode: 401,
        payload:
        {
          statusCode: 401,
          error: 'Unauthorized',
          message: 'Unauthorized',
        },
        headers: {},
      });
    });
  });
});
