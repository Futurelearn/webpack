const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const shared = require('./shared');

const developmentConfig = {
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
    ...shared.optimization,
    splitChunks: {
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
  },
  output: {
    ...shared.output,
    filename: `[name].js`,
    chunkFilename: `[name].js`,

  },
};

if (process.env.USE_STYLESHEETS) {
  developmentConfig.plugins.unshift(new MiniCssExtractPlugin({
    filename: `[name].css`,
  }));
}

module.exports = developmentConfig;
