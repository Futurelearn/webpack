const { resolve } = require('path');

const DEFAULT_STYLE_LOADERS = [
  'resolve-url-loader',
  {
    loader: 'sass-loader',
    options: {
      sourceMap: true,
    },
  },
  {
    loader: 'sass-resources-loader',
    options: {
      resources: [
        resolve('app', './assets/stylesheets/application/1-tools/_all.scss'),
        resolve('app', './assets/stylesheets/application/2-brand/_all.scss'),
        resolve('app', './assets/stylesheets/application/base/_all.scss'),
      ],
    },
  },
];

module.exports = DEFAULT_STYLE_LOADERS;