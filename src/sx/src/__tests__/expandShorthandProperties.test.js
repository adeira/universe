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

it('expands background as expected', () => {
  expect(expandShorthandProperties('background', 'red').map(printNodes)).toMatchInlineSnapshot(`
    Array [
      "._2rGYXd{background-image:none}",
      ".vSqk6{background-position:0% 0%}",
      "._1m2K58{background-size:auto auto}",
      "._2RyIOg{background-repeat:repeat}",
      "._87W4L{background-origin:padding-box}",
      "._3IDiTj{background-clip:border-box}",
      "._376SiR{background-attachment:scroll}",
      ".pmdn8{background-color:#f00}",
    ]
  `);

  expect(expandShorthandProperties('background', 'none').map(printNodes)).toMatchInlineSnapshot(`
    Array [
      "._2rGYXd{background-image:none}",
      ".vSqk6{background-position:0% 0%}",
      "._1m2K58{background-size:auto auto}",
      "._2RyIOg{background-repeat:repeat}",
      "._87W4L{background-origin:padding-box}",
      "._3IDiTj{background-clip:border-box}",
      "._376SiR{background-attachment:scroll}",
      "._15yiKT{background-color:transparent}",
    ]
  `);
});

it('ignores more complex background syntaxes', () => {
  expect(
    expandShorthandProperties('background', 'no-repeat url("../../media/examples/lizard.png")').map(
      printNodes,
    ),
  ).toMatchInlineSnapshot(`
    Array [
      "._3yHEnM{background:no-repeat url(\\"../../media/examples/lizard.png\\")}",
    ]
  `);
});

it('expands border as expected', () => {
  expect(expandShorthandProperties('border', 'red').map(printNodes)).toMatchInlineSnapshot(`
    Array [
      "._37Z8WG{border-width:medium}",
      "._1QzWHp{border-style:none}",
      "._3mBzuo{border-color:#f00}",
    ]
  `);
});

it('ignores more complex border syntaxes', () => {
  expect(expandShorthandProperties('border', '4mm ridge rgba(170, 50, 220, .6)').map(printNodes))
    .toMatchInlineSnapshot(`
    Array [
      "._4kdXYU{border:4mm ridge rgba(170, 50, 220, .6)}",
    ]
  `);
});

it('expands margins and paddings as expected', () => {
  // 1) single number
  expect(expandShorthandProperties('margin', 0).map(printNodes)).toMatchInlineSnapshot(`
    Array [
      "._4pgUgJ{margin-top:0px}",
      "._37wPvZ{margin-right:0px}",
      "._32zari{margin-bottom:0px}",
      "._3DMcik{margin-left:0px}",
    ]
  `);
  expect(expandShorthandProperties('padding', 0).map(printNodes)).toMatchInlineSnapshot(`
    Array [
      "._2YU8Lt{padding-top:0px}",
      "._1b3SDU{padding-right:0px}",
      "._4vQ4Ez{padding-bottom:0px}",
      "._1lfgYw{padding-left:0px}",
    ]
  `);

  // 1) single string value
  expect(expandShorthandProperties('margin', '10px').map(printNodes)).toMatchInlineSnapshot(`
    Array [
      "._3sgLnu{margin-top:10px}",
      "._42OSNq{margin-right:10px}",
      "._27cO38{margin-bottom:10px}",
      "._21Xfw8{margin-left:10px}",
    ]
  `);
  expect(expandShorthandProperties('padding', '10px').map(printNodes)).toMatchInlineSnapshot(`
    Array [
      "._2h8fCA{padding-top:10px}",
      "._18S2bQ{padding-right:10px}",
      "._1Dvao8{padding-bottom:10px}",
      "._3RfpBN{padding-left:10px}",
    ]
  `);

  // 2) two values
  expect(expandShorthandProperties('margin', '10px 20px').map(printNodes)).toMatchInlineSnapshot(`
    Array [
      "._3sgLnu{margin-top:10px}",
      "._4098WN{margin-right:20px}",
      "._27cO38{margin-bottom:10px}",
      "._1yVWfq{margin-left:20px}",
    ]
  `);
  expect(expandShorthandProperties('padding', '10px 20px').map(printNodes)).toMatchInlineSnapshot(`
    Array [
      "._2h8fCA{padding-top:10px}",
      "._3PTJRo{padding-right:20px}",
      "._1Dvao8{padding-bottom:10px}",
      "._2EBnAo{padding-left:20px}",
    ]
  `);

  // 3) three values
  expect(expandShorthandProperties('margin', '10px 20px 30px').map(printNodes))
    .toMatchInlineSnapshot(`
    Array [
      "._3sgLnu{margin-top:10px}",
      "._4098WN{margin-right:20px}",
      "._2ynoCr{margin-bottom:30px}",
      "._1yVWfq{margin-left:20px}",
    ]
  `);
  expect(expandShorthandProperties('padding', '10px 20px 30px').map(printNodes))
    .toMatchInlineSnapshot(`
    Array [
      "._2h8fCA{padding-top:10px}",
      "._3PTJRo{padding-right:20px}",
      "._2iKTDO{padding-bottom:30px}",
      "._2EBnAo{padding-left:20px}",
    ]
  `);

  // 4) four values
  expect(expandShorthandProperties('margin', '10px 20px 30px 40px').map(printNodes))
    .toMatchInlineSnapshot(`
    Array [
      "._3sgLnu{margin-top:10px}",
      "._4098WN{margin-right:20px}",
      "._2ynoCr{margin-bottom:30px}",
      "._2frFkL{margin-left:40px}",
    ]
  `);
  expect(expandShorthandProperties('padding', '10px 20px 30px 40px').map(printNodes))
    .toMatchInlineSnapshot(`
    Array [
      "._2h8fCA{padding-top:10px}",
      "._3PTJRo{padding-right:20px}",
      "._2iKTDO{padding-bottom:30px}",
      "._3I54Zi{padding-left:40px}",
    ]
  `);
});

it('expands overflow as expected', () => {
  expect(expandShorthandProperties('overflow', 'visible').map(printNodes)).toMatchInlineSnapshot(`
    Array [
      "._25umgG{overflow-x:visible}",
      "._2tdzbW{overflow-y:visible}",
    ]
  `);

  expect(expandShorthandProperties('overflow', 'hidden visible').map(printNodes))
    .toMatchInlineSnapshot(`
    Array [
      "._4x3KLH{overflow-x:hidden}",
      "._2tdzbW{overflow-y:visible}",
    ]
  `);

  expect(expandShorthandProperties('overflow', 'unset').map(printNodes)).toMatchInlineSnapshot(`
    Array [
      "._385HMz{overflow-x:unset}",
      "._1fxwLm{overflow-y:unset}",
    ]
  `);

  // testing nonsense value (should not do anything)
  expect(expandShorthandProperties('overflow', 'aaa bbb ccc').map(printNodes))
    .toMatchInlineSnapshot(`
    Array [
      "._4y1zXJ{overflow-x:aaa bbb ccc}",
      "._3UWS63{overflow-y:aaa bbb ccc}",
    ]
  `);
});

it('expands flex as expected', () => {
  // Keyword values
  expect(expandShorthandProperties('flex', 'auto').map(printNodes)).toMatchInlineSnapshot(`
    Array [
      ".TV2t8{flex-grow:1}",
      "._3vr0Oj{flex-shrink:1}",
      "._49Fg6A{flex-basis:auto}",
    ]
  `);
  expect(expandShorthandProperties('flex', 'initial').map(printNodes)).toMatchInlineSnapshot(`
    Array [
      ".viT4x{flex-grow:0}",
      "._3vr0Oj{flex-shrink:1}",
      "._49Fg6A{flex-basis:auto}",
    ]
  `);
  expect(expandShorthandProperties('flex', 'none').map(printNodes)).toMatchInlineSnapshot(`
    Array [
      ".viT4x{flex-grow:0}",
      "._3LouD0{flex-shrink:0}",
      "._49Fg6A{flex-basis:auto}",
    ]
  `);

  // One value, unitless number: flex-grow
  expect(expandShorthandProperties('flex', '2').map(printNodes)).toMatchInlineSnapshot(`
    Array [
      "._2nqNa4{flex-grow:2}",
      "._3vr0Oj{flex-shrink:1}",
      "._17V51Q{flex-basis:0px}",
    ]
  `);

  // One value, width/height: flex-basis
  expect(expandShorthandProperties('flex', '10em').map(printNodes)).toMatchInlineSnapshot(`
    Array [
      ".viT4x{flex-grow:0}",
      "._3vr0Oj{flex-shrink:1}",
      "._48AWIw{flex-basis:10em}",
    ]
  `);
  expect(expandShorthandProperties('flex', '30%').map(printNodes)).toMatchInlineSnapshot(`
    Array [
      ".viT4x{flex-grow:0}",
      "._3vr0Oj{flex-shrink:1}",
      "._4t8Ssm{flex-basis:30%}",
    ]
  `);
  expect(expandShorthandProperties('flex', 'min-content').map(printNodes)).toMatchInlineSnapshot(`
    Array [
      ".viT4x{flex-grow:0}",
      "._3vr0Oj{flex-shrink:1}",
      ".FeX7y{flex-basis:min-content}",
    ]
  `);

  // Two values: flex-grow | flex-basis
  expect(expandShorthandProperties('flex', '1 30px').map(printNodes)).toMatchInlineSnapshot(`
    Array [
      ".TV2t8{flex-grow:1}",
      "._3vr0Oj{flex-shrink:1}",
      "._4lbv5h{flex-basis:30px}",
    ]
  `);

  // Two values: flex-grow | flex-shrink
  expect(expandShorthandProperties('flex', '2 2').map(printNodes)).toMatchInlineSnapshot(`
    Array [
      "._2nqNa4{flex-grow:2}",
      "._2jTr3g{flex-shrink:2}",
      "._49Fg6A{flex-basis:auto}",
    ]
  `);

  // Three values: flex-grow | flex-shrink | flex-basis
  expect(expandShorthandProperties('flex', '2 2 10%').map(printNodes)).toMatchInlineSnapshot(`
    Array [
      "._2nqNa4{flex-grow:2}",
      "._2jTr3g{flex-shrink:2}",
      "._2Aix5e{flex-basis:10%}",
    ]
  `);
});
