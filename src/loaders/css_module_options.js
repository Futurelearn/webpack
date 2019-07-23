const loaderUtils = require('loader-utils');
const { posix } = require('path');

const CSS_MODULE_OPTIONS = {
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

    const className = loaderUtils.interpolateName(
      context,
      `${fileNameOrFolder}-${localName}_${hash}`,
      options,
    );

    return className.replace('.module', '');
  },
  localsConvention: 'asIs',
  sourceMap: process.env.NODE_ENV !== 'production',
  importLoaders: 3,
  onlyLocals: process.env.NODE_ENV === 'production',
};

module.exports = CSS_MODULE_OPTIONS;
