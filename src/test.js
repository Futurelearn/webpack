const { DefinePlugin } = require('webpack');
const shared = require('./shared');

module.exports = {
  ...shared,
  name: 'test',
  plugins: [
    ...shared.plugins,
    new DefinePlugin({
      __REACT_DEVTOOLS_GLOBAL_HOOK__: '({ isDisabled: true })',
    }),
  ],
};
