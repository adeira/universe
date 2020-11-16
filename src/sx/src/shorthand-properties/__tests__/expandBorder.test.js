// @flow

import expandBorder from '../expandBorder';
import printNodes from './printNodes';

it('expands border as expected', () => {
  expect(expandBorder('border', 'red').map(printNodes)).toMatchInlineSnapshot(`
    Array [
      "._37Z8WG{border-width:medium}",
      "._1QzWHp{border-style:none}",
      "._3mBzuo{border-color:#f00}",
    ]
  `);
});

it('ignores more complex border syntaxes', () => {
  expect(expandBorder('border', '4mm ridge rgba(170, 50, 220, .6)').map(printNodes))
    .toMatchInlineSnapshot(`
    Array [
      "._4kdXYU{border:4mm ridge rgba(170, 50, 220, .6)}",
    ]
  `);
});
