const WebpackAssetsManifest = require('webpack-assets-manifest');
const shared = require('./shared');

module.exports = {
  ...shared,
  mode: 'development',
  name: 'development',
  plugins: [
    ...shared.plugins,
    new WebpackAssetsManifest({
      entrypoints: true,
      writeToDisk: true,
      publicPath: shared.output.publicPath,
    }),
  ],
  output: {
    ...shared.output,
    filename: `[name].js`,
    chunkFilename: `[name].js`,

  },
};
