const {
  resolve, extname, dirname,
} = require('path');
const { safeLoad } = require('js-yaml');
const { readFileSync } = require('fs');
const { ensureSymlinkSync } = require('fs-extra');
const { sync } = require('glob');

const configPath = resolve('config', 'webpack.yml');
const railsEnv = process.env.RAILS_ENV || 'production';
const config = safeLoad(readFileSync(configPath), 'utf8')[railsEnv];

const externalAssetsHost = process.env.EXTERNAL_ASSETS_HOST;

ensureSymlinkSync(config.legacy_src_symlink, config.legacy_dest_symlink);

const getEntries = (entryPaths) => {
  const entries = {};
  const legacyEntries = {};

  entryPaths.forEach(({
    glob,
    use_dir_name: useDirName,
    root_path: rootPath,
    resolved_extensions: resolvedExtensions,
    legacy,
  }) => {
    const entryGlob = `${rootPath}${glob}{${resolvedExtensions.join(',')}}`;
    const paths = sync(entryGlob);

    paths.forEach((path) => {
      if (useDirName) {
        const entryDir = dirname(path);
        const entryDirWithoutRootPath = entryDir.replace(rootPath, '');
        if (legacy) {
          legacyEntries[`${entryDirWithoutRootPath}`] = resolve(path);
        } else {
          entries[`${entryDirWithoutRootPath}`] = resolve(path);
        }
      } else {
        const pathWithoutRootPath = path.replace(rootPath, '');
        const pathWithoutExtension = pathWithoutRootPath.replace(extname(path), '');
        if (legacy) {
          legacyEntries[`${pathWithoutExtension}`] = resolve(path);
        } else {
          entries[`${pathWithoutExtension}`] = resolve(path);
        }
      }
    });
  });

  return { entries, legacyEntries };
};

const { entries, legacyEntries } = getEntries(config.entry_paths);

module.exports = {
  entries,
  legacyEntries,
  extensions: config.extensions,
  resolvedPaths: config.resolved_paths,
  legacyResolvedPaths: config.resolved_legacy_paths,
  cachePath: config.cache_path,
  output: {
    path: resolve(config.path),
    publicPath: config.external_public_path,
    hypernovaPublicPath: config.hypernova_external_public_path,
  },
  assetsVersion: config.assets_version || '1.0',
};
