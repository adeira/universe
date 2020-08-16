module.exports = {
  root: true,
  env: {
    jest: true,
    node: true,
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: false,
    },
  },
  extends: ["@adeira/eslint-config"],
  rules: {
    "react/jsx-no-undef": "off",
  },
};
