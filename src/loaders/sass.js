const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DEFAULT_STYLE_LOADERS = require('./default_style_loaders');

const use = [
  {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
    },
  },
  ...DEFAULT_STYLE_LOADERS,
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
