const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { resolve } = require('path');

const use = [
  'cache-loader',
  {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
    },
  },
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
      ],
    },
  },
];

if (process.env.NODE_ENV !== 'production') {
  use.unshift({ loader: 'style-loader' });
}

if (process.env.NODE_ENV === 'production') {
  use.unshift(MiniCssExtractPlugin.loader);
}

module.exports = {
  test: /\.(scss|sass|css)$/i,
  use,
};
