const _ = require('lodash');
const basicAuth = require('basic-auth');
const boom = require('boom');
const { server: { authentication } } = require('config');

module.exports = (req, res, next) => {
  const credentials = _.pick(basicAuth(req), ['name', 'pass']);

  if (!_.isEqual(credentials, authentication)) {
    return next(boom.unauthorized());
  }
  return next();
};
