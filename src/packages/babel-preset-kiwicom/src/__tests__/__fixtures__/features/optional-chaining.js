// @flow

module.exports = function(a: ?{ +[string]: any, ... }) {
  return a?.b ?? 'default';
};
