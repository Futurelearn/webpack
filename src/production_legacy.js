const WebpackAssetsManifest = require('webpack-assets-manifest');
const TerserPlugin = require('terser-webpack-plugin');
const { HashedModuleIdsPlugin, NamedChunksPlugin } = require('webpack');
const shared = require('./shared_legacy');

module.exports = {
  ...shared,
  name: 'production',
  devtool: 'none',
  optimization: {
    ...shared.optimization,
    minimize: true,
    minimizer: [new TerserPlugin({
      parallel: true,
      cache: true,
      sourceMap: false,
      terserOptions: {
        compress: false,
        ecma: 5,
        warnings: false,
        safari10: true,
        ie8: false,
        output: {
          ascii_only: true,
        },
      },
    })],
  },
  plugins: [
    ...shared.plugins,
    new HashedModuleIdsPlugin({}),
    new NamedChunksPlugin(),
    new WebpackAssetsManifest({
      output: 'manifest-legacy.json',
      entrypoints: true,
      writeToDisk: true,
      publicPath: shared.output.publicPath,
    }),
  ],
};
