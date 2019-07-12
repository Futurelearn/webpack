module.exports = {
  test: /\.(jpg|jpeg|png|gif|tiff|ico|svg|eot|otf|ttf|woff|woff2)$/i,
  use: [
    'cache-loader',
    {
      loader: 'file-loader',
      options: {
        name: '[path][name]-[hash].[ext]',
      },
    },
  ],
};
