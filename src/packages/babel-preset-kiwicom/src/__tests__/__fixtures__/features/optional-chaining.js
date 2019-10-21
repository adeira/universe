// @flow

module.exports = function(a: ?{ +[string]: any, ... }): string {
  return a?.b ?? 'default';
};
