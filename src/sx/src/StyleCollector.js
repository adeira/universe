// @flow

import { invariant, warning } from '@adeira/js';

import StyleCollectorAtNode from './StyleCollectorAtNode';
import StyleCollectorNode, { type PrintableNode } from './StyleCollectorNode';
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
//   "aaa" => Set {
//     StyleCollectorNode {
//       "hash": "c0",
//       "styleName": "color",
//       "styleValue": "#00f",
//     },
//   },
//   "bbb" => Set {
//     StyleCollectorNode {
//       "hash": "c1",
//       "styleName": "font-size",
//       "styleValue": "1rem",
//     },
//     StyleCollectorNode {
//       "hash": "c2",
//       "styleName": "color",
//       "styleValue": "#00f",
//     },
//   },
// },
type StyleBufferType = Map<string, Set<PrintableNode>>;

class StyleCollector {
  #styleBuffer: StyleBufferType;

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
          styleBuffer.add(node);

          // add record to the hash registry
          const hashRegistryKey = `${maybeName}${hashSeed}`;
          if (hashRegistry.has(styleSheetName)) {
            hashRegistry.get(styleSheetName)?.set(hashRegistryKey, node.getHash());
          } else {
            hashRegistry.set(styleSheetName, new Map([[hashRegistryKey, node.getHash()]]));
          }
        } else if (maybeName.startsWith(':')) {
          // pseudo type
          const nodes = traverse(styleSheetName, maybeValue, new Set([]), maybeName);
          styleBuffer.add(new StyleCollectorPseudoNode(maybeName, nodes));
        } else if (maybeName.startsWith('@media') || maybeName.startsWith('@supports')) {
          // at rule type
          const nodes = traverse(styleSheetName, maybeValue, new Set([]), maybeName);
          styleBuffer.add(new StyleCollectorAtNode(maybeName, nodes));
        } else {
          // be silent in production (warning only)
          const messsage = `Unsupported rule "%s"`;
          invariant(!__DEV__, messsage, maybeName);
          warning(__DEV__, messsage, maybeName);
        }
      }
      return styleBuffer;
    };

    this.#styleBuffer = new Map();
    for (const styleSheetName of Object.keys(baseStyleSheet)) {
      const styleSheetObject = baseStyleSheet[styleSheetName];
      this.#styleBuffer.set(
        styleSheetName,
        traverse(styleSheetName, styleSheetObject, new Set([])),
      );
    }

    return {
      styleBuffer: this.#styleBuffer,
      hashRegistry: hashRegistry,
    };
  }

  print(): string {
    let sxStyle = '';
    this.#styleBuffer.forEach((nodeSet) => {
      nodeSet.forEach((node) => {
        sxStyle += node.print();
      });
    });
    return sxStyle;
  }
}

const styleCollector = new StyleCollector();

export default (styleCollector: StyleCollector);
