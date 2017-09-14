const _ = require('lodash');
const { headersBuilder } = require('./helper');
const { server: { authentication } } = require('config');
const auth = require('./');

describe('auth', () => {
  it('should authenticate on correct credentials', () => {
    const req = headersBuilder(authentication.name, authentication.pass);
    auth(req, _.noop, (next) => {
      expect(next).toBeUndefined();
    });
  });

  it('should throw Unauthorized error on bad credentials', () => {
    const req = headersBuilder('bad', 'creds');
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
