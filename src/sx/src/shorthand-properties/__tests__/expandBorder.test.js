// @flow

import expandBorder from '../expandBorder';
import expandShorthandProperties from '../../expandShorthandProperties';
import printNodes from './printNodes';

describe('physical CSS borders', () => {
  it('expands border as expected', () => {
    expect(expandBorder('border', 'red')).toEqual(expandShorthandProperties('border', 'red', ''));
    expect(expandBorder('border', 'red').map(printNodes)).toMatchInlineSnapshot(`
      Array [
        "._37Z8WG{border-width:medium}",
        "._1QzWHp{border-style:none}",
        "._3mBzuo{border-color:#f00}",
      ]
    `);
  });

  it('ignores more complex border syntaxes', () => {
    expect(expandBorder('border', '4mm ridge rgba(170, 50, 220, .6)')).toEqual(
      expandShorthandProperties('border', '4mm ridge rgba(170, 50, 220, .6)', ''),
    );
    expect(expandBorder('border', '4mm ridge rgba(170, 50, 220, .6)').map(printNodes))
      .toMatchInlineSnapshot(`
        Array [
          "._4kdXYU{border:4mm ridge rgba(170, 50, 220, .6)}",
        ]
      `);
  });
});

describe('logical CSS block borders', () => {
  it('expands border as expected', () => {
    expect(expandBorder('borderBlock', 'red')).toEqual(
      expandShorthandProperties('borderBlock', 'red', ''),
    );
    expect(expandBorder('borderBlock', 'red').map(printNodes)).toMatchInlineSnapshot(`
      Array [
        "._2vfLjv{border-block-width:medium}",
        "._2ENQ5g{border-block-style:none}",
        ".Q9cUa{border-block-color:#f00}",
      ]
    `);
  });

  it('ignores more complex border syntaxes', () => {
    expect(expandBorder('borderBlock', '4mm ridge rgba(170, 50, 220, .6)')).toEqual(
      expandShorthandProperties('borderBlock', '4mm ridge rgba(170, 50, 220, .6)', ''),
    );
    expect(expandBorder('borderBlock', '4mm ridge rgba(170, 50, 220, .6)').map(printNodes))
      .toMatchInlineSnapshot(`
        Array [
          "._2RPo2I{border-block:4mm ridge rgba(170, 50, 220, .6)}",
        ]
      `);
  });
});

describe('logical CSS inline borders', () => {
  it('expands border as expected', () => {
    expect(expandBorder('borderInline', 'red')).toEqual(
      expandShorthandProperties('borderInline', 'red', ''),
    );
    expect(expandBorder('borderInline', 'red').map(printNodes)).toMatchInlineSnapshot(`
      Array [
        "._25D1Lj{border-inline-width:medium}",
        "._2H7Sk2{border-inline-style:none}",
        "._9hos4{border-inline-color:#f00}",
      ]
    `);
  });

  it('ignores more complex border syntaxes', () => {
    expect(expandBorder('borderInline', '4mm ridge rgba(170, 50, 220, .6)')).toEqual(
      expandShorthandProperties('borderInline', '4mm ridge rgba(170, 50, 220, .6)', ''),
    );
    expect(expandBorder('borderInline', '4mm ridge rgba(170, 50, 220, .6)').map(printNodes))
      .toMatchInlineSnapshot(`
        Array [
          "._1FXcjx{border-inline:4mm ridge rgba(170, 50, 220, .6)}",
        ]
      `);
  });
});
