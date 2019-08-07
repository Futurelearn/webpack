const CLIENT_SIDE_ONLY_PACKAGES = require('./client_side_only_packages');

module.exports = {
  test: /.*node_modules.*\b(c3|d3|d3v4|react-select|tribute)\b/i,
  use: 'null-loader',
};
