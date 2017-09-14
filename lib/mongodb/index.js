const _ = require('lodash');
const boom = require('boom');
const sharp = require('sharp');
const connection = require('./connection');

let gridfs;

/**
 * @param {Object} data - Input.
 * @param {Object} data.stream - Requires an image buffer.
 * @param {Object} data.opts - File parameters.
 * @returns {string} - The image id.
 */
const uploadImage = ({ stream, opts }) =>
  new Promise((resolve, reject) => {
    const writeStream = gridfs.createWriteStream(opts);
    stream.pipe(writeStream);
    writeStream.on('close', file => resolve(_.toString(file._id))); // eslint-disable-line no-underscore-dangle
    writeStream.on('error', reject);
  });

/**
 * @param {Object} data - Input.
 * @param {Object} data.id - The image id.
 * @returns {boolean} - Returns true on success.
 */
const deleteImage = async ({ id }) => {
  const opts = { _id: id };

  if (!await gridfs.exist(opts)) {
    throw boom.notFound();
  }

  try {
    await gridfs.remove(opts);
    return true;
  } catch (err) {
    throw boom.notFound();
  }
};

/**
 * @param {Object} data - Input.
 * @param {Object} data.id - The image id.
 * @returns {Object} - Sharp compliant image.
 */
const getImage = async ({ id }) => {
  const opts = { _id: id };

  if (!await gridfs.exist(opts)) {
    throw boom.notFound();
  }

  const pipeline = sharp();
  const readStream = gridfs.createReadStream(opts);
  return readStream.pipe(pipeline);
};

const listImages = async () => {
};

/**
 * @param {Object=} config - MongoDB configuration.
 * @returns {Object} - Returns function with upload, delete, get, and list methods.
 */
module.exports = async (config) => {
  try {
    gridfs = await connection(config);
    return {
      uploadImage,
      deleteImage,
      getImage,
      listImages,
    };
  } catch (err) { throw err; }
};
