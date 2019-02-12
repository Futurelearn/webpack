const {
  resolve, extname, dirname,
} = require('path');
const { safeLoad } = require('js-yaml');
const { readFileSync } = require('fs');
const { sync } = require('glob');

const configPath = resolve('config', 'webpack.yml');
const railsEnv = process.env.RAILS_ENV || 'production';
const config = safeLoad(readFileSync(configPath), 'utf8')[railsEnv];

const getEntries = (entryPaths) => {
  const results = {};
  entryPaths.forEach(({
    glob, use_dir_name: useDirName, root_path: rootPath, resolved_extensions: resolvedExtensions,
  }) => {
    const entryGlob = `${rootPath}${glob}{${resolvedExtensions.join(',')}}`;
    const paths = sync(entryGlob);
    paths.forEach((path) => {
      if (useDirName) {
        const entryDir = dirname(path);
        const entryDirWithoutRootPath = entryDir.replace(rootPath, '');
        results[`${entryDirWithoutRootPath}`] = resolve(path);
      } else {
        const pathWithoutRootPath = path.replace(rootPath, '');
        const pathWithoutExtension = pathWithoutRootPath.replace(extname(path), '');
        results[`${pathWithoutExtension}`] = resolve(path);
      }
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
    path: resolve(config.path),
    publicPath: config.public_path,
    hypernovaPublicPath: config.hypernova_public_path,
  },
  assetsVersion: config.assets_version || '1.0',
};
