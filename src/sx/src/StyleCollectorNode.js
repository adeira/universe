// @flow

import { invariant } from '@adeira/js';

import hashStyle from './hashStyle';
import transformValue from './transformValue';
import transformStyleName from './transformStyleName';

export type PrintConfig = {|
  +pseudo?: string,
  +bumpSpecificity?: boolean,
|};

export interface StyleCollectorNodeInterface {
  print(config?: PrintConfig): string;
  addNodes(nodes: Map<string, StyleCollectorNodeInterface>): void;
}

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
    this.hash = hashStyle(`${styleName}${styleValue}${hashSeed}`);
    this.styleName = transformStyleName(styleName);
    this.styleValue = transformValue(styleName, styleValue);
  }

  // eslint-disable-next-line no-unused-vars
  addNodes(nodes: Map<string, StyleCollectorNodeInterface>) {
    invariant(false, 'StyleCollectorNode cannot have nested nodes,');
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

  print(config?: PrintConfig): string {
    const className = `.${this.hash}`.repeat(config?.bumpSpecificity === true ? 2 : 1);
    const pseudo = config?.pseudo ?? '';
    return `${className}${pseudo}{${this.styleName}:${this.styleValue}}`;
  }
}
