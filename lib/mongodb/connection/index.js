const boom = require('boom');
const config = require('config');
const mongoUriBuilder = require('mongo-uri-builder');
const { MongoClient } = require('mongodb');

module.exports = async (input) => {
  try {
    const connectionString = mongoUriBuilder(input || config.mongo);
    const db = await MongoClient.connect(connectionString);
    return db;
  } catch (err) {
    if (err.codeName === 'AuthenticationFailed') {
      throw boom.unauthorized();
    } else {
      throw boom.serverUnavailable();
    }
  }
};
