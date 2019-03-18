const WebpackAssetsManifest = require('webpack-assets-manifest');
const shared = require('./shared_legacy');

module.exports = {
  ...shared,
  mode: 'development',
  name: 'development',
  plugins: [
    ...shared.plugins,
    new WebpackAssetsManifest({
      output: 'manifest-legacy.json',
      entrypoints: true,
      writeToDisk: true,
      publicPath: shared.output.publicPath,
    }),
  ],
};
