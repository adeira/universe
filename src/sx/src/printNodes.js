// @flow

import StyleCollectorAtNode from './StyleCollectorAtNode';
import StyleCollectorNode from './StyleCollectorNode';
import StyleCollectorPseudoNode from './StyleCollectorPseudoNode';

const STYLESHEET_SEPARATOR = '\n';

/**
 * This function takes care of the correct rendering of each node. Additionally, it takes care of
 * browser prefixing.
 */
export default function printNodes(
  nodes: $ReadOnlyArray<StyleCollectorAtNode | StyleCollectorNode | StyleCollectorPseudoNode>,
) {
  const printedRules = [];
  for (const node of nodes) {
    if (node instanceof StyleCollectorNode) {
      printedRules.push(printStyleCollectorNode(node));
    } else if (node instanceof StyleCollectorPseudoNode) {
      printedRules.push(printStyleCollectorPseudoNode(node));
    } else if (node instanceof StyleCollectorAtNode) {
      printedRules.push(printStyleCollectorAtNode(node));
    } else {
      // TODO: invariant
    }
  }

  // TODO: auto prefixing
  return printedRules.join(STYLESHEET_SEPARATOR);
}

export function printStyleCollectorNode(node: StyleCollectorNode, config = {}) {
  const pseudo = config.pseudo ?? '';
  const withIncreasedSpecificity = config.increaseSpecificity ?? false;

  const selectorText = `.${node.getHash()}`.repeat(withIncreasedSpecificity === true ? 2 : 1);
  const selectorTextWithPseudo = `${selectorText}${pseudo}`;

  // TODO: apply auto prefixing in case it's called directly without `printNodes`
  return `${selectorTextWithPseudo}{${node.getStyleName()}:${node.getStyleValue()}}`;
}

export function printStyleCollectorPseudoNode(pseudoNode: StyleCollectorPseudoNode, config = {}) {
  const withIncreasedSpecificity = config.increaseSpecificity ?? false;
  const printedRules = [];
  for (const [, node] of pseudoNode.getNodes()) {
    printedRules.push(
      printStyleCollectorNode(node, {
        pseudo: pseudoNode.getPseudo(),
        increaseSpecificity: withIncreasedSpecificity,
      }),
    );
  }

  // TODO: apply auto prefixing in case it's called directly without `printNodes`
  return printedRules.join(STYLESHEET_SEPARATOR);
}

export function printStyleCollectorAtNode(atNode: StyleCollectorAtNode) {
  const printedAtRules = [];
  for (const [, node] of atNode.getNodes()) {
    if (node instanceof StyleCollectorNode) {
      printedAtRules.push(printStyleCollectorNode(node, { increaseSpecificity: true }));
    } else if (node instanceof StyleCollectorPseudoNode) {
      printedAtRules.push(printStyleCollectorPseudoNode(node, { increaseSpecificity: true }));
    } else if (node instanceof StyleCollectorAtNode) {
      printedAtRules.push(
        printStyleCollectorAtNode(node, {
          increaseSpecificity: true, // Should the specificity be increased even more for nested at rules?
        }),
      );
    } else {
      // TODO: invariant
    }
  }

  // TODO: apply auto prefixing in case it's called directly without `printNodes`
  return `${atNode.getAtRuleName()}{\n${printedAtRules.join(STYLESHEET_SEPARATOR)}\n}`;
}
