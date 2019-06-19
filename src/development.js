const WebpackAssetsManifest = require('webpack-assets-manifest');
const shared = require('./shared');

const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap({
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
  optimization: {
    ...shared.optimization,
    splitChunks: {
      cacheGroups: {
        common: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  },
  output: {
    ...shared.output,
    filename: `[name].js`,
    chunkFilename: `[name].js`,

  },
});
