module.exports = {
  test: /shared\/svg_icons\/.+html/,
  use: [
    {
      loader: '@svgr/webpack',
      options: {
        svgo: false,
      },
    },
  ],
};
