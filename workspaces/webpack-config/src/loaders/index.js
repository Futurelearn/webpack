const sass = require('./sass');
const noSassLoader = require('../server_side_loaders/no_sass');
const file = require('./file');
const svg = require('./svg');
const babel = require('./babel');
const babelES5 = require('./babel.es5');
const babelNode = require('../server_side_loaders/babel.node');

module.exports.base = {
  sass,
  file,
  svg,
  babel,
};

module.exports.legacy = {
  noSassLoader,
  file,
  svg,
  babelES5,
};

module.exports.hypernova = {
  file,
  svg,
  babelNode,
};
