const CSS_MODULE_OPTIONS = require('../loaders/css_module_options');
const DEFAULT_STYLE_LOADERS = require('../loaders/default_style_loaders');

const use = [
  {
    loader: 'css-loader/locals',
    options: CSS_MODULE_OPTIONS,
  },
  ...DEFAULT_STYLE_LOADERS,
];

module.exports = {
  test: /\.module.(scss|sass|css)$/i,
  use,
};
