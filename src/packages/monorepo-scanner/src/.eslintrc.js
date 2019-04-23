const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  globals: {
    // set each global variable name equal to true to allow the variable
    // to be overwritten or false to disallow overwriting
    __DEV__: false,
    __SRC_ROOT__: false,
    __SRC_APPS_ROOT__: false,
    __SRC_PACKAGES_ROOT__: false,
  },
};
