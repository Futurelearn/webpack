const { join, resolve } = require('path');
const config = require('../config');

const cacheLoaderCachePath = join(config.cachePath, 'svg-cache-loader');

module.exports = {
  test: /shared\/svg_icons\/.+html/,
  use: [
    {
      loader: 'cache-loader',
      options: {
        cacheDirectory: cacheLoaderCachePath,
      },
    },
    {
      loader: '@svgr/webpack',
      options: {
        svgo: false,
      },
    },
  ],
};
