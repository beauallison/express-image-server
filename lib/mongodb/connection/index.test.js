const config = require('config');
const connection = require('./');

describe('mongodb/connection', () => {
  it('should connect to mongodb', async () => {
    const gridfs = await connection();
    expect(gridfs.db.databaseName).toEqual(config.mongo.database);
  });

  it('should throw authentication error on bad credentials', async () => {
    try {
      await connection({ username: 'wrong', password: 'wrong' });
    } catch (err) {
      expect(err.isBoom).toBe(true);
      expect(err.output).toEqual({
        statusCode: 401,
        payload:
        {
          statusCode: 401,
          error: 'Unauthorized',
          message: 'Unauthorized',
        },
        headers: {},
      });
    }
  });
});
