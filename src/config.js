const {
  resolve, join, basename, extname,
} = require('path');
const { safeLoad } = require('js-yaml');
const { readFileSync } = require('fs');
const { sync } = require('glob');

const configPath = resolve('config', 'webpack.yml');
const railsEnv = process.env.RAILS_ENV || 'production';
const config = safeLoad(readFileSync(configPath), 'utf8')[railsEnv];

const getEntries = (entryPaths) => {
  const results = {};
  const glob = `**/*{${config.extensions.join(',')}}`;
  entryPaths.forEach((rootPath) => {
    const paths = sync(join(rootPath, glob));
    paths.forEach((path) => {
      results[`${basename(path, extname(path))}`] = resolve(path);
    });
  });

  return results;
};

module.exports = {
  entries: getEntries(config.entry_paths),
  extensions: config.extensions,
  resolvedPaths: config.resolved_paths,
  cachePath: config.cache_path,
  output: {
    path: resolve('public', config.public_output_path),
    publicPath: `/${config.public_output_path}/`,
  },
  assetsVersion: config.assets_version || '1.0',
};
