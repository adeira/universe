// @flow

import StyleCollectorNode from '../../StyleCollectorNode';

export default function printNodes(node: StyleCollectorNode): string {
  return node.printNodes().join('');
}
