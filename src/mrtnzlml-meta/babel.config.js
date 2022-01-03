module.exports = function (api) {
  api.assertVersion(7);
  api.cache(true);

  return {
    presets: ['@adeira/babel-preset-adeira'],
  };
};
