module.exports = {
  test: /\.(scss|sass|css)$/i,
  exclude: /\.module.(scss|sass|css)$/i,
  use: 'null-loader',
};
