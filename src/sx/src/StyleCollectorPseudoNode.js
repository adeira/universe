// @flow

import { type PrintableNode, type PrintConfig } from './StyleCollectorNode';

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
export default class StyleCollectorPseudoNode implements PrintableNode {
  pseudo: string;
  nodes: Set<PrintableNode>;

  constructor(pseudo: string, nodes: Set<PrintableNode>) {
    this.pseudo = pseudo;
    this.nodes = nodes;
  }

  getPseudo(): string {
    return this.pseudo;
  }

  print(config?: PrintConfig): string {
    let output = '';
    this.nodes.forEach((node) => {
      output += node.print({ ...config, pseudo: this.pseudo });
    });
    return output;
  }
}
