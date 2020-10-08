// @flow

import { type PrintableNode, type PrintConfig } from './StyleCollectorNode';

/**
 * Represents any "at" rule:
 *
 * ```
 * '@media screen': {
 *   'fontSize': 14,
 *   ':hover': {
 *     color: 'pink',
 *   },
 *   '@media (max-width: 12cm)': {
 *     color: 'blue',
 *   },
 * },
 * ```
 *
 *   ↓ ↓ ↓
 *
 * ```
 * {
 *   name: '@media screen',
 *   nodes: [
 *     StyleCollectorNode,
 *     StyleCollectorPseudoNode,
 *     StyleCollectorAtNode,
 *   ],
 * }
 * ```
 */
export default class StyleCollectorAtNode implements PrintableNode {
  atRuleName: string;
  nodes: Set<PrintableNode>;

  constructor(atRuleName: string, nodes: Set<PrintableNode>) {
    this.atRuleName = atRuleName;
    this.nodes = nodes;
  }

  // eslint-disable-next-line no-unused-vars
  print(config?: PrintConfig): string {
    let output = '';
    this.nodes.forEach((node) => {
      output += node.print({ bumpSpecificity: true });
    });
    return `${this.atRuleName}{${output}}`;
  }
}
