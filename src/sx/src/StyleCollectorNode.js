// @flow

import { invariant } from '@adeira/js';

import hashStyle from './hashStyle';
import transformValue from './transformValue';
import transformStyleName from './transformStyleName';
import type { PrintConfig, StyleCollectorNodeInterface } from './StyleCollectorNodeInterface';

/**
 * Represents the most basic style node:
 *
 * ```
 * color: 'red'
 * ```
 *
 *   ↓ ↓ ↓
 *
 * ```
 * {
 *   hash: 'c0',
 *   styleName: 'color',
 *   styleValue: 'red',
 * }
 * ```
 */
export default class StyleCollectorNode implements StyleCollectorNodeInterface {
  hash: string;
  styleName: string;
  styleValue: string | number;

  constructor(styleName: string, styleValue: string | number, hashSeed: string = '') {
    this.styleName = transformStyleName(styleName);
    this.styleValue = transformValue(styleName, styleValue);
    this.hash = hashStyle(`${this.styleName}${this.styleValue}${hashSeed}`);
  }

  // eslint-disable-next-line no-unused-vars
  addNodes(nodes: Map<string, StyleCollectorNodeInterface>) {
    invariant(false, 'StyleCollectorNode cannot have nested nodes.');
  }

  getNodes(): Map<string, StyleCollectorNode> {
    invariant(false, 'StyleCollectorNode cannot have nested nodes.');
  }

  getHash(): string {
    return this.hash;
  }

  getStyleName(): string {
    return this.styleName;
  }

  getStyleValue(): string | number {
    return this.styleValue;
  }

  // CSSStyleRule.selectorText
  rehydrationIdentifier() {
    return `.${this.getHash()}`;
  }
}
