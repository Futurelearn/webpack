const development = require('./src/development');
const production = require('./src/production');
const hypernova = require('./src/hypernova');
const developmentLegacy = require('./src/development_legacy');
const productionLegacy = require('./src/production_legacy');

module.exports = {
  development,
  production,
  hypernova,
  developmentLegacy,
  productionLegacy,
};
