// @flow

import expandShorthandProperties from '../expandShorthandProperties';
import type StyleCollectorNode from '../StyleCollectorNode';

function printNodes(node: StyleCollectorNode) {
  return node.printNodes().join('');
}

it('ignores unknown properties', () => {
  expect(expandShorthandProperties('unknownProperty', 'thisShouldNotChange').map(printNodes))
    .toMatchInlineSnapshot(`
    Array [
      "._3BbwKd{unknown-property:thisShouldNotChange}",
    ]
  `);
});
