const { join, resolve } = require('path');
const { cachePath } = require('../config');

module.exports = {
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        root: resolve(__dirname, '..', '..'),
        configFile: resolve(__dirname, '..', '..', 'babel.config.node.js'),
        cacheDirectory: join(cachePath, 'babel-loader'),
      },
    },
  ],
};
