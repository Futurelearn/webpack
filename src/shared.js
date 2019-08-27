const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const { EnvironmentPlugin } = require('webpack');
const config = require('./config');
const loaders = require('./loaders');

module.exports = {
  entry: config.entries,
  resolve: {
    extensions: config.extensions,
    modules: [...config.resolvedPaths, 'node_modules'],
    alias: {
      tribute: 'tributejs/dist/tribute.min.js',
    },
  },
  module: {
    rules: Object.values(loaders.base),
  },
  mode: 'production',
  plugins: [
    new EnvironmentPlugin({ ...process.env }),
    new LodashModuleReplacementPlugin(),
  ],
  optimization: {
    minimize: false,
    minimizer: [],
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        common: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            if (!module.nameForCondition) {
              return true;
            }

            const packageName = module.nameForCondition().match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
    runtimeChunk: 'single',
  },
  output: {
    path: config.output.path,
    publicPath: config.output.publicPath,
    filename: `[name]-[chunkhash]-${config.assetsVersion}.js`,
    chunkFilename: `[name]-[chunkhash]-${config.assetsVersion}.js`,
  },
};
