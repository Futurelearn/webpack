module.exports = {
  test: /\.(scss|sass|css)$/i,
  exclude: [
    /\.module.(scss|sass|css)$/i,
    /print_products_download\.scss$/,
    /print_products_printers\.scss$/,
  ],
  use: 'null-loader',
};
