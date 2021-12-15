/* eslint-disable ft-flow/require-valid-file-annotation */

module.exports = function buildDevExpression(babel) {
  return babel.template.expression.ast('process.env.NODE_ENV !== "production"');
};
