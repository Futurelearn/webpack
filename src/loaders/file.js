module.exports = {
  test: [
    /\.(jpg|jpeg|png|gif|tiff|ico|svg|eot|otf|ttf|woff|woff2)$/i,
    /app\/javascript\/vendor\/safari-nomodule.js/,
    /app\/javascript\/vendor\/html5shiv-printshiv.min.js/,
  ],
  use: [
    {
      loader: 'file-loader',
      options: {
        name: '[path][name]-[hash].[ext]',
      },
    },
  ],
};
