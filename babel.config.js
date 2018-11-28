module.exports = (api) => {
  const presets = [
    ['@babel/preset-env', {
      shippedProposals: true,
      targets: '> 0.25% , not dead',
      exclude: ['transform-regenerator', 'transform-async-to-generator'],
    }],
    '@babel/preset-react',
  ];

  const plugins = [
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-syntax-dynamic-import',
    'lodash',
    [
      '@babel/plugin-proposal-class-properties',
      {
        spec: true,
      },
    ],
    [
      'module:fast-async',
      {
        spec: true,
      },
    ],
  ];

  if (api.env('test')) {
    plugins.push(...[
      '@babel/plugin-transform-modules-commonjs',
      'dynamic-import-node',
    ]);
  }

  if (api.env('production')) {
    plugins.push(
      ['transform-react-remove-prop-types', {
        ignoreFilenames: ['node_modules'],
      }],
    );
  }

  return {
    presets,
    plugins,
  };
};
