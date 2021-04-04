// @flow strict

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
 */
export default class StyleCollectorPseudoNode implements StyleCollectorNodeInterface {
  pseudo: string;
  nodes: Map<string, StyleCollectorNodeInterface>;

  constructor(pseudo: string, nodes: Map<string, StyleCollectorNodeInterface>) {
    this.pseudo = pseudo;
    this.nodes = nodes;
  }

  addNodes(nodes: Map<string, StyleCollectorNodeInterface>) {
    this.nodes = new Map([...this.nodes, ...nodes]);
  }

  getPseudo(): string {
    return this.pseudo;
  }

  printNodes(config?: PrintConfig): $ReadOnlyArray<string> {
    let output = [];
    this.nodes.forEach((node) => {
      output = output.concat(node.printNodes({ ...config, pseudo: this.pseudo }));
    });
    return output;
  }
}
