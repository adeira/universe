// @flow

import { invariant, warning } from '@adeira/js';

import StyleCollectorAtNode from './StyleCollectorAtNode';
import StyleCollectorNode, { type StyleCollectorNodeInterface } from './StyleCollectorNode';
import StyleCollectorPseudoNode from './StyleCollectorPseudoNode';

// "hashRegistry": Map {
//   "aaa" => Map {
//     "color" => "c0",
//   },
//   "bbb" => Map {
//     "fontSize" => "c1",
//     "color" => "c2",
//   },
// },
type HashRegistryType = Map<string, Map<string, string>>;

// "styleBuffer": Map {
//   "c0" => StyleCollectorNode {
//     "hash": "c0",
//     "styleName": "color",
//     "styleValue": "#00f",
//   },
//   "c1" => StyleCollectorNode {
//     "hash": "c1",
//     "styleName": "font-size",
//     "styleValue": "1rem",
//   },
//   "c2" => StyleCollectorNode {
//     "hash": "c2",
//     "styleName": "color",
//     "styleValue": "#00f",
//   },
// },
type StyleBufferType = Map<string, StyleCollectorNodeInterface>;

class StyleCollector {
  #styleBuffer: StyleBufferType = new Map();

  collect(baseStyleSheet: {|
    +[sheetName: string]: $FlowFixMe,
  |}): {| +hashRegistry: HashRegistryType, +styleBuffer: StyleBufferType |} {
    const hashRegistry: HashRegistryType = new Map();

    const traverse = (styleSheetName, styleSheetObject, styleBuffer, hashSeed = '') => {
      // we need to iterate it - there might be pseudo classes, at rules or leaf types
      for (const maybeName of Object.keys(styleSheetObject)) {
        const maybeValue = styleSheetObject[maybeName];
        if (typeof maybeValue === 'number' || typeof maybeValue === 'string') {
          // basic leaf type
          const node = new StyleCollectorNode(maybeName, maybeValue, hashSeed);
          styleBuffer.set(node.getHash(), node);
          // add record to the hash registry
          const hashRegistryKey = `${maybeName}${hashSeed}`;
          if (hashRegistry.has(styleSheetName)) {
            hashRegistry.get(styleSheetName)?.set(hashRegistryKey, node.getHash());
          } else {
            hashRegistry.set(styleSheetName, new Map([[hashRegistryKey, node.getHash()]]));
          }
        } else if (maybeName.startsWith(':')) {
          // pseudo type (:hover, ::after, ...)
          for (const key of Object.keys(maybeValue)) {
            invariant(key.startsWith(':') === false, 'Nested pseudo classes are not allowed.');
          }
          const nodes = traverse(styleSheetName, maybeValue, new Map(), maybeName);
          if (styleBuffer.has(maybeName)) {
            styleBuffer.get(maybeName)?.addNodes(nodes);
          } else {
            const node = new StyleCollectorPseudoNode(maybeName, nodes);
            styleBuffer.set(node.getPseudo(), node);
          }
        } else if (maybeName.startsWith('@media') || maybeName.startsWith('@supports')) {
          // at rule type (@media, @supports, ...)
          const nodes = traverse(styleSheetName, maybeValue, new Map(), maybeName);
          if (styleBuffer.has(maybeName)) {
            styleBuffer.get(maybeName)?.addNodes(nodes);
          } else {
            const node = new StyleCollectorAtNode(maybeName, nodes);
            styleBuffer.set(node.getAtRuleName(), node);
          }
        } else {
          // be silent in production (warning only)
          const messsage = `Unsupported rule "%s"`;
          invariant(!__DEV__, messsage, maybeName);
          warning(__DEV__, messsage, maybeName);
        }
      }
      return styleBuffer;
    };

    for (const styleSheetName of Object.keys(baseStyleSheet)) {
      const styleSheetObject = baseStyleSheet[styleSheetName];
      traverse(styleSheetName, styleSheetObject, this.#styleBuffer);
    }

    return {
      styleBuffer: this.#styleBuffer,
      hashRegistry: hashRegistry,
    };
  }

  print(): string {
    let sxStyle = '';
    this.#styleBuffer.forEach((node) => {
      sxStyle += node.print();
    });
    return sxStyle;
  }

  reset(): void {
    this.#styleBuffer.clear();
  }
}

const styleCollector = new StyleCollector();

export default (styleCollector: StyleCollector);
