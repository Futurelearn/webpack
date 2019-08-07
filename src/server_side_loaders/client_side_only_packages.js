const { resolve } = require('path');

const clientSideOnlyPackageNames = [
  'c3',
  'd3',
  'd3v4',
  'react-select',
  'tribute',
];

const paths = clientSideOnlyPackageNames.map(packageName => resolve(__dirname, `node_modules/${packageName}`));

module.exports = {
  clientSideOnlyPackageNames,
  clientSideOnlyPackagePaths: paths,
};
