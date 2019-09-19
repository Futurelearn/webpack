const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const shared = require('./shared');

module.exports = {
  ...shared,
  mode: 'development',
  name: 'development',
  plugins: [
    ...shared.plugins,
    new MiniCssExtractPlugin(),
    new WebpackAssetsManifest({
      entrypoints: true,
      writeToDisk: true,
      publicPath: shared.output.publicPath,
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  output: {
    ...shared.output,
    filename: `[name].js`,
    chunkFilename: `[name].js`,
  },
};
