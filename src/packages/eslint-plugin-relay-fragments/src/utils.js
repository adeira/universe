// @flow

const { parse } = require('graphql');

export function isGraphQLTemplate(node /*: any */) {
  return (
    node.tag.type === 'Identifier' && node.tag.name === 'graphql' && node.quasi.quasis.length === 1
  );
}

export function getGraphQLAST(taggedTemplateExpression /*: any */) {
  if (taggedTemplateExpression.quasi.quasis.length !== 1) {
    // has substitutions, covered by graphql-syntax rule
    return null;
  }

  const quasi = taggedTemplateExpression.quasi.quasis[0];
  try {
    return parse(quasi.value.cooked);
  } catch (error) {
    // Invalid syntax, covered by graphql-syntax rule
    return null;
  }
}
