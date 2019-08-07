const { clientSideOnlyPackagePaths } = require('./client_side_only_packages');

module.exports = {
  test: clientSideOnlyPackagePaths,
  use: 'null-loader',
};
