const config = require('./config');
const loaders = require('./loaders');
const { mode, plugins, optimization } = require('./shared');

module.exports = {
  entry: config.legacyEntries,
  resolve: {
    extensions: config.extensions,
    modules: [...config.resolvedPaths, 'node_modules'],
    alias: {
      tribute: 'tributejs/dist/tribute.min.js',
    },
  },
  module: {
    rules: Object.values(loaders.legacy),
  },
  mode,
  plugins,
  optimization,
  output: {
    path: config.output.path,
    publicPath: config.output.publicPath,
    filename: `[name]-[chunkhash]-${config.assetsVersion}.es5.js`,
    chunkFilename: `[name]-[chunkhash]-${config.assetsVersion}.es5.js`,
  },
};
