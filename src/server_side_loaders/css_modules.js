const loaderUtils = require('loader-utils');
const { posix, resolve } = require('path');

const use = [
  {
    loader: 'css-loader/locals',
    options: {
      modules: true,
      getLocalIdent(context, localIdentName, localName, options) {
        const fileNameOrFolder = context.resourcePath.match(/index\.module\.(css|scss|sass)$/)
          ? '[folder]'
          : '[name]';

        const hash = loaderUtils.getHashDigest(
          posix.relative(context.rootContext, context.resourcePath) + localName,
          'md5',
          'base64',
          5,
        );

        if (process.env.NODE_ENV === 'production') {
          return hash;
        }

        const className = loaderUtils.interpolateName(
          context,
          `${fileNameOrFolder}-${localName}_${hash}`,
          options,
        );

        return className.replace('.module', '');
      },
      localsConvention: 'asIs',
      onlyLocals: true,
      sourceMap: false,
      importLoaders: 2,
    },
  },
  'resolve-url-loader',
  {
    loader: 'sass-loader',
    options: {
      sourceMap: true,
    },
  },
  {
    loader: 'sass-resources-loader',
    options: {
      resources: [
        resolve('app', './assets/stylesheets/application/1-tools/_all.scss'),
        resolve('app', './assets/stylesheets/application/2-brand/_all.scss'),
        resolve('app', './assets/stylesheets/application/base/_all.scss'),
      ],
    },
  },
];

module.exports = {
  test: /\.module.(scss|sass|css)$/i,
  use,
};
