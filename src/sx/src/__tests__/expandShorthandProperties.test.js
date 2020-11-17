// @flow

import expandShorthandProperties from '../expandShorthandProperties';

function printNodes(node) {
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
