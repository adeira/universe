// @flow strict

import type { PrintConfig, StyleCollectorNodeInterface } from './StyleCollectorNodeInterface';

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
export default class StyleCollectorAtNode implements StyleCollectorNodeInterface {
  atRuleName: string;
  nodes: Map<string, StyleCollectorNodeInterface>;

  constructor(atRuleName: string, nodes: Map<string, StyleCollectorNodeInterface>) {
    this.atRuleName = atRuleName;
    this.nodes = nodes;
  }

  addNodes(nodes: Map<string, StyleCollectorNodeInterface>) {
    this.nodes = new Map([...this.nodes, ...nodes]);
  }

  getNodes() {
    return this.nodes;
  }

  getAtRuleName(): string {
    return this.atRuleName;
  }
}
