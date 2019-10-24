const { use: fileLoader } = require('./file');

module.exports = {
  test: /\.svg$/,
  oneOf: [
    {
      resourceQuery: /inline/,
      use: {
        loader: '@svgr/webpack',
        options: {
          svgo: false,
        },
      },
    },
    {
      use: fileLoader,
    },
  ],
};
