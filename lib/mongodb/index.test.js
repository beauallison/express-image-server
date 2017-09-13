const mongodb = require('./');

describe('mongodb/', () => {
  it('should return upload, delete, get, and list on success', async () => {
    const images = await mongodb();
    expect(Object.keys(images)).toEqual(['upload', 'delete', 'get', 'list']);
  });
});
