const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const TerserPlugin = require('terser-webpack-plugin');
const { HashedModuleIdsPlugin, NamedChunksPlugin } = require('webpack');
const shared = require('./shared');
const config = require('./config');

const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap({
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
        ecma: 8,
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
    new MiniCssExtractPlugin({
      filename: `[name]-[contenthash]-${config.assetsVersion}.css`,
    }),
    new HashedModuleIdsPlugin({}),
    new NamedChunksPlugin(),
    new WebpackAssetsManifest({
      entrypoints: true,
      writeToDisk: true,
      publicPath: shared.output.publicPath,
    }),
  ],
});
