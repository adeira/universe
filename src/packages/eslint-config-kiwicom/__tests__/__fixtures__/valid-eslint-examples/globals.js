// @flow strict

module.exports = {
  nitroTranslations() {
    return __('First name');
  },
  devExpression() {
    // Read-only global '__DEV__' should not be modified (vv)
    __DEV__ = false; // eslint-disable-line no-global-assign
    // Seems like Eslint doesn't treat `global` objects as one would expect: https://github.com/eslint/eslint/issues/11333
    // This should result in errors (?):
    global.__DEV__ = false;
    globalThis.__DEV__ = false;
    return __DEV__;
  },
  formData() {
    return new FormData();
  },
};
