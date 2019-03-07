const sass = require('./sass');
const file = require('./file');
const svg = require('./svg');
const babel = require('./babel');
const babelNode = require('../server_side_loaders/babel.node');

module.exports.base = {
  sass,
  file,
  svg,
  babel,
};

module.exports.hypernova = {
  file,
  svg,
  babelNode,
};
