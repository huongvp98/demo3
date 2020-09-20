const path = require('path');

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      '@containers': path.resolve(__dirname, 'src/containers'),
      '@configs': path.resolve(__dirname, 'src/configs'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@resources': path.resolve(__dirname, 'src/resources'),
      '@images': path.resolve(__dirname, 'src/resources/images'),
      '@strings': path.resolve(__dirname, 'src/resources/strings'),
      '@styles': path.resolve(__dirname, 'src/resources/styles'),
      '@data-access': path.resolve(__dirname, 'src/data-access'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@redux-store': path.resolve(__dirname, 'src/redux-store'),
      '@hooks': path.resolve(__dirname, 'src/hook'),
      '@constants': path.resolve(__dirname, 'src/constants'),
    },
  };

  return config;
};
