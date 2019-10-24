module.exports = {
  test: /\.(jpg|jpeg|png|gif|tiff|ico|eot|otf|ttf|woff|woff2)$/i,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: (process.env.NODE_ENV === 'production') ? '[path][name]-[contenthash].[ext]' : '[path][name].[ext]',
      },
    },
  ],
};
