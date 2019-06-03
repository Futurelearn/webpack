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
    filename: `[name].es5.js`,
    chunkFilename: `[name].es5.js`,

  },
};
