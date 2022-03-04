// @flow strict

import type { AllCSSPseudoTypes } from './css-properties/__generated__/AllCSSPseudoTypes';
import StyleCollectorNode from './StyleCollectorNode';
import type { PrintConfig, StyleCollectorNodeInterface } from './StyleCollectorNodeInterface';

/**
 * Represents basic style node with pseudo class:
 *
 * ```
 * ':hover': {
 *   color: 'red',
 *   textDecoration: 'underline',
 * },
 * ```
 *
 *   ↓ ↓ ↓
 *
 * ```
 * {
 *   pseudo: ':hover',
 *   nodes: [
 *     StyleCollectorNode,
 *     StyleCollectorNode,
 *   ],
 * }
 * ```
 *
 * Note that nesting pseudo classes is not allowed in SX.
 */
export default class StyleCollectorPseudoNode implements StyleCollectorNodeInterface {
  pseudo: string;
  nodes: Map<string, StyleCollectorNode>;

  constructor(pseudo: $Keys<AllCSSPseudoTypes>, nodes: Map<string, StyleCollectorNode>) {
    this.pseudo = pseudo;
    this.nodes = nodes;
  }

  addNodes(nodes: Map<string, StyleCollectorNode>) {
    this.nodes = new Map([...this.nodes, ...nodes]);
  }

  getNodes(): Map<string, StyleCollectorNode> {
    return this.nodes;
  }

  getPseudo(): string {
    return this.pseudo;
  }

  // printNodes(config?: PrintConfig): $ReadOnlyArray<string> {
  //   let output = [];
  //   this.nodes.forEach((node) => {
  //     output = output.concat(node.printNodes({ ...config, pseudo: this.pseudo }));
  //   });
  //   return output;
  // }

  // CSSStyleRule.selectorText
  // rehydrationIdentifier() {
  //   return `.${this.getHash()}`;
  // }
}
