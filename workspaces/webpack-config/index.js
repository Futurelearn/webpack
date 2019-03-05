const development = require('./src/development');
const production = require('./src/production');
const test = require('./src/test');
const hypernova = require('./src/hypernova');
const developmentLegacy = require('./src/development_legacy');
const productionLegacy = require('./src/production_legacy');

module.exports = {
  development,
  test,
  production,
  hypernova,
  developmentLegacy,
  productionLegacy,
};
