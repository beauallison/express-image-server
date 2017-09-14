const boom = require('boom');
const config = require('config');
const gridfsStream = require('gridfs-stream');
const mongoUriBuilder = require('mongo-uri-builder');
const mongodb = require('mongodb');

module.exports = async (input) => {
  try {
    const connectionString = mongoUriBuilder(input || config.mongo);
    const db = await mongodb.MongoClient.connect(connectionString);
    const gridfs = gridfsStream(db, mongodb);
    return gridfs;
  } catch (err) {
    if (err.codeName === 'AuthenticationFailed') {
      throw boom.unauthorized();
    } else {
      throw boom.serverUnavailable();
    }
  }
};
