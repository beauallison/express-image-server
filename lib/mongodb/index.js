const connection = require('./connection');

let db;

const uploadImage = async (image) => {
};

const deleteImage = async (id) => {
};

const getImage = async (id) => {
};

const listImages = async () => {
};

module.exports = async (config) => {
  try {
    db = await connection(config);
    return {
      upload: uploadImage,
      delete: deleteImage,
      get: getImage,
      list: listImages,
    };
  } catch (err) { throw err; }
};
