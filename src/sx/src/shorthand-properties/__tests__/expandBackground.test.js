// @flow

import expandBackground from '../expandBackground';
import expandShorthandProperties from '../../expandShorthandProperties';
import printNodes from './printNodes';

it('expands background as expected', () => {
  expect(expandBackground('background', 'red')).toEqual(
    expandShorthandProperties('background', 'red', ''),
  );
  expect(expandBackground('background', 'red').map(printNodes)).toMatchInlineSnapshot(`
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

  expect(expandBackground('background', 'none')).toEqual(
    expandShorthandProperties('background', 'none', ''),
  );
  expect(expandBackground('background', 'none').map(printNodes)).toMatchInlineSnapshot(`
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
    expandBackground('background', 'no-repeat url("../../media/examples/lizard.png")'),
  ).toEqual(
    expandShorthandProperties('background', 'no-repeat url("../../media/examples/lizard.png")', ''),
  );
  expect(
    expandBackground('background', 'no-repeat url("../../media/examples/lizard.png")').map(
      printNodes,
    ),
  ).toMatchInlineSnapshot(`
    Array [
      "._3yHEnM{background:no-repeat url(\\"../../media/examples/lizard.png\\")}",
    ]
  `);
});
