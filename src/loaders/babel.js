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
        cacheDirectory: join(cachePath, 'babel-loader'),
      },
    },
  ],
};
