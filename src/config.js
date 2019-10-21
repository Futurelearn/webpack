const {
  resolve, extname, dirname,
} = require('path');
const { safeLoad } = require('js-yaml');
const { readFileSync } = require('fs');
const { sync } = require('glob');

const configPath = resolve('config', 'webpack.yml');
const railsEnv = process.env.RAILS_ENV || 'production';
const config = safeLoad(readFileSync(configPath), 'utf8')[railsEnv];

const entryName = ({ useDirName, rootPath, path }) => {
  if (useDirName) {
    return dirname(path).replace(rootPath, '');
  } else {
    return path.replace(rootPath, '').replace(extname(path), '');
  }
};

const getEntries = (entryPaths) => {
  const entries = {};
  const legacyEntries = {};
  const serverEntries = {};

  entryPaths.forEach(({
    glob,
    use_dir_name: useDirName,
    root_path: rootPath,
    legacy,
    server,
  }) => {
    const entryGlob = `${rootPath}${glob}`;
    const paths = sync(entryGlob);

    paths.forEach((path) => {
      const key = entryName({ useDirName, rootPath, path });
      const value = resolve(path);

      if (server) {
        serverEntries[key] = value;
      } else if (legacy) {
        legacyEntries[key] = value;
      } else {
        entries[key] = value;
      }
    });
  });

  return { entries, legacyEntries, serverEntries };
};

const { entries, legacyEntries, serverEntries } = getEntries(config.entry_paths);

module.exports = {
  entries,
  legacyEntries,
  serverEntries,
  extensions: config.extensions,
  resolvedPaths: config.resolved_paths,
  cachePath: config.cache_path,
  output: {
    path: resolve(config.path),
    publicPath: process.env.ASSET_HOST ? `${process.env.ASSET_HOST}/packs/` : config.public_path,
    hypernovaPath: resolve(config.hypernova_path),
    hypernovaPublicPath: config.hypernova_public_path,
  },
  assetsVersion: config.assets_version || '1.0',
};
