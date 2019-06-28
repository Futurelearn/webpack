const CLIENT_SIDE_ONLY_PACKAGES = require('./client_side_only_packages');

module.exports = {
  test: CLIENT_SIDE_ONLY_PACKAGES,
  use: 'null-loader',
};
