module.exports = {
  test: /shared\/svg_icons\/.+html/,
  use: [
    'cache-loader',
    {
      loader: '@svgr/webpack',
      options: {
        svgo: false,
      },
    },
  ],
};
