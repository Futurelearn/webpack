const DEFAULT_STYLE_LOADERS = [
  'resolve-url-loader',
  {
    loader: 'sass-loader',
    options: {
      sourceMap: true,
    },
  },
];

module.exports = DEFAULT_STYLE_LOADERS;
