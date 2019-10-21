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
      if (useDirName) {
        const entryDir = dirname(path);
        const entryDirWithoutRootPath = entryDir.replace(rootPath, '');
        if (server) {
          serverEntries[`${entryDirWithoutRootPath}`] = resolve(path);
        } else if (legacy) {
          legacyEntries[`${entryDirWithoutRootPath}`] = resolve(path);
        } else {
          entries[`${entryDirWithoutRootPath}`] = resolve(path);
        }
      } else {
        const pathWithoutRootPath = path.replace(rootPath, '');
        const pathWithoutExtension = pathWithoutRootPath.replace(extname(path), '');
        if (server) {
          serverEntries[`${pathWithoutExtension}`] = resolve(path);
        } else if (legacy) {
          legacyEntries[`${pathWithoutExtension}`] = resolve(path);
        } else {
          entries[`${pathWithoutExtension}`] = resolve(path);
        }
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
  legacyResolvedPaths: config.resolved_legacy_paths,
  cachePath: config.cache_path,
  output: {
    path: resolve(config.path),
    publicPath: process.env.ASSET_HOST ? `${process.env.ASSET_HOST}/packs/` : config.public_path,
    hypernovaPath: resolve(config.hypernova_path),
    hypernovaPublicPath: config.hypernova_public_path,
  },
  assetsVersion: config.assets_version || '1.0',
};
