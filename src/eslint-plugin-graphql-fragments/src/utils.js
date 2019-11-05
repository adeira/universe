// @flow

const { parse } = require('graphql');

/*::
import type { DocumentNode } from 'graphql';
*/

function isGraphQLTemplate(node /*: any */) /*: boolean %checks */ {
  return (
    node.tag.type === 'Identifier' && node.tag.name === 'graphql' && node.quasi.quasis.length === 1
  );
}

function getGraphQLAST(taggedTemplateExpression /*: any */) /*: null | DocumentNode */ {
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

function calculateComplexity(node /*: any */) /*: number */ {
  let score = 0;

  function walkGraph(node /*: any */) {
    if (node.kind === 'Document') {
      node.definitions.forEach(definition => walkGraph(definition));
    }

    if (['FragmentSpread', 'InlineFragment', 'Field'].includes(node.kind)) {
      score += 1;

      if (node.selectionSet && Array.isArray(node.selectionSet.selections)) {
        // extra penalty for object field
        score += 1;
      }
    }

    if (node.kind === 'OperationDefinition') {
      // query, subscription & mutation are highly penalized to encourage usage of fragments
      score += 8;
    }

    if (node.selectionSet && Array.isArray(node.selectionSet.selections)) {
      node.selectionSet.selections.forEach(selection => walkGraph(selection));
    }
  }

  walkGraph(node);
  return score;
}

module.exports = {
  isGraphQLTemplate,
  getGraphQLAST,
  calculateComplexity,
};
