const WebpackAssetsManifest = require('webpack-assets-manifest');
const { DefinePlugin } = require('webpack');
const shared = require('./shared');

module.exports = {
  ...shared,
  name: 'test',
  plugins: [
    ...shared.plugins,
    new WebpackAssetsManifest({
      entrypoints: true,
      writeToDisk: true,
      publicPath: shared.output.publicPath,
    }),
    new DefinePlugin({
      __REACT_DEVTOOLS_GLOBAL_HOOK__: '({ isDisabled: true })',
    }),
  ],
};
