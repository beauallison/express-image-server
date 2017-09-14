module.exports.authorizationBuilder =
  (username, password) =>
    `basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;

module.exports.headersBuilder = (username, password) => ({
  headers: {
    authorization: exports.authorizationBuilder(username, password),
  },
});
