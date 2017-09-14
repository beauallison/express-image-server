const _ = require('lodash');
const { image } = require('../../test');
const mongodb = require('./');
const connection = require('./connection');

describe('mongodb/', () => {
  let client;
  let mongo;

  // Clean up database after each run
  beforeAll(async () => { client = await connection(); });
  afterAll(async () => client.db.dropDatabase());

  it('should return uploadImage, deleteImage, getImage, and listImages on success', async () => {
    mongo = await mongodb();
    expect(Object.keys(mongo)).toEqual(['uploadImage', 'deleteImage', 'getImage', 'listImages']);
  });

  it('should upload an image', async () => {
    const id = await mongo.uploadImage({ stream: image(), opts: { filename: 'london.png' } });
    expect(_.isString(id)).toBeTruthy();
  });

  it('should get an image', async () => {
    const id = await mongo.uploadImage({ stream: image(), opts: { filename: 'london2.png' } });
    const result = await mongo.getImage({ id });
    expect(result.readable).toBeTruthy();
  });

  it('should delete an image', async () => {
    const id = await mongo.uploadImage({ stream: image(), opts: { filename: 'london.png' } });
    const result = await mongo.deleteImage({ id });
    expect(result).toBeTruthy();
    try {
      await mongo.getImage({ id });
    } catch (err) {
      expect(err.isBoom).toBe(true);
      expect(err.output).toEqual({
        statusCode: 404,
        payload:
        {
          statusCode: 404,
          error: 'Not Found',
          message: 'Not Found',
        },
        headers: {},
      });
    }
  });
});
