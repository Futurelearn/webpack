const sass = require('./sass');
const noSassLoader = require('../server_side_loaders/no_sass');
const file = require('./file');
const svg = require('./svg');
const babel = require('./babel');
const babelES5 = require('./babel.es5');
const babelNode = require('../server_side_loaders/babel.node');
const serverCssModules = require('../server_side_loaders/css_modules');
const cssModules = require('./css_modules');

const fileWithoutPrintProductFonts = {
  ...file,
  exclude: [
    /app\/assets\/fonts\/print_products/,
  ],
};

module.exports.base = {
  sass,
  cssModules,
  file: fileWithoutPrintProductFonts,
  svg,
  babel,
};

module.exports.legacy = {
  noSassLoader,
  serverCssModules,
  file: fileWithoutPrintProductFonts,
  svg,
  babelES5,
};

module.exports.hypernova = {
  file,
  svg,
  babelNode,
};
