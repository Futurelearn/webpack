const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CSS_MODULE_OPTIONS = require('./css_module_options');
const DEFAULT_STYLE_LOADERS = require('./default_style_loaders');

const use = [
  {
    loader: 'css-loader',
    options: CSS_MODULE_OPTIONS,
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
  test: /\.module.(scss|sass|css)$/i,
  use,
};
