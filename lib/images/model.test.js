let model = require('./model');

describe('images/model', () => {
  it('should return uploadImage, deleteImage, getImage, and listImages', async () => {
    model = await model();
    expect(Object.keys(model)).toEqual(['uploadImage', 'deleteImage', 'getImage', 'listImages']);
  });
});
