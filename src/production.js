const { relative } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const TerserPlugin = require('terser-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const { HashedModuleIdsPlugin, NamedChunksPlugin } = require('webpack');
const shared = require('./shared');
const config = require('./config');

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
    new HardSourceWebpackPlugin(),
    new HardSourceWebpackPlugin.ExcludeModulePlugin([{
      test: /mini-css-extract-plugin[\\/]dist[\\/]loader/,
    }]),
    new MiniCssExtractPlugin({
      filename: `[name]-[contenthash]-${config.assetsVersion}.css`,
    }),
    new HashedModuleIdsPlugin({}),
    new NamedChunksPlugin((chunk) => {
      if (chunk.name) {
        return chunk.name;
      }
      return chunk.mapModules(m => relative(m.context, m.request)).join('_');
    }),
  ],
};
