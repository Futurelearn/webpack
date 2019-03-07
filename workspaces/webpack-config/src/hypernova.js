const { resolve } = require('path');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const nodeExternals = require('webpack-node-externals');
const { DefinePlugin } = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const shared = require('./shared');
const config = require('./config');
const serverSideLoaders = require('./server_side_loaders');
const { hypernova } = require('./loaders');

const hypernovaConfig = {
  ...shared,
  name: 'hypernova',
  target: 'node',
  externals: [nodeExternals()],
  devtool: 'none',
  module: {
    ...shared.module,
    rules: [
      ...Object.values(serverSideLoaders),
      ...Object.values(hypernova),
    ],
  },
  plugins: [
    ...shared.plugins,
    new WebpackAssetsManifest({
      entrypoints: false,
      writeToDisk: true,
      publicPath: config.output.hypernovaPublicPath,
    }),
    new DefinePlugin({
      __SERVER__: true,
    }),
  ],
  optimization: {
    ...shared.optimization,
    splitChunks: false,
    runtimeChunk: false,
  },
  output: {
    ...shared.output,
    libraryTarget: 'commonjs',
    path: resolve(shared.output.path, 'server'),
  },
};

if (process.env.NODE_ENV === 'production') {
  hypernovaConfig.plugins.unshift(new HardSourceWebpackPlugin());
  Object.assign(hypernovaConfig, { optimization: {
    ...hypernovaConfig.optimization,
    minimize: true,
    minimizer: [new TerserPlugin({
      parallel: true,
      cache: true,
      terserOptions: {
        compress: false,
      },
    })],
  }});
}

module.exports = hypernovaConfig;
