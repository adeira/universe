// @flow

import expandMarginPadding from '../expandMarginPadding';
import expandShorthandProperties from '../../expandShorthandProperties';
import printNodes from './printNodes';

it('expands margins and paddings as expected', () => {
  // 1) single number
  expect(expandMarginPadding('margin', 0)).toEqual(expandShorthandProperties('margin', 0, ''));
  expect(expandMarginPadding('margin', 0).map(printNodes)).toMatchInlineSnapshot(`
    Array [
      "._4pgUgJ{margin-top:0px}",
      "._37wPvZ{margin-right:0px}",
      "._32zari{margin-bottom:0px}",
      "._3DMcik{margin-left:0px}",
    ]
  `);
  expect(expandMarginPadding('padding', 0)).toEqual(expandShorthandProperties('padding', 0, ''));
  expect(expandMarginPadding('padding', 0).map(printNodes)).toMatchInlineSnapshot(`
    Array [
      "._2YU8Lt{padding-top:0px}",
      "._1b3SDU{padding-right:0px}",
      "._4vQ4Ez{padding-bottom:0px}",
      "._1lfgYw{padding-left:0px}",
    ]
  `);

  // 1) single string value
  expect(expandMarginPadding('margin', '10px')).toEqual(
    expandShorthandProperties('margin', '10px', ''),
  );
  expect(expandMarginPadding('margin', '10px').map(printNodes)).toMatchInlineSnapshot(`
    Array [
      "._3sgLnu{margin-top:10px}",
      "._42OSNq{margin-right:10px}",
      "._27cO38{margin-bottom:10px}",
      "._21Xfw8{margin-left:10px}",
    ]
  `);
  expect(expandMarginPadding('padding', '10px')).toEqual(
    expandShorthandProperties('padding', '10px', ''),
  );
  expect(expandMarginPadding('padding', '10px').map(printNodes)).toMatchInlineSnapshot(`
    Array [
      "._2h8fCA{padding-top:10px}",
      "._18S2bQ{padding-right:10px}",
      "._1Dvao8{padding-bottom:10px}",
      "._3RfpBN{padding-left:10px}",
    ]
  `);

  // 2) two values
  expect(expandMarginPadding('margin', '10px 20px')).toEqual(
    expandShorthandProperties('margin', '10px 20px', ''),
  );
  expect(expandMarginPadding('margin', '10px 20px').map(printNodes)).toMatchInlineSnapshot(`
    Array [
      "._3sgLnu{margin-top:10px}",
      "._4098WN{margin-right:20px}",
      "._27cO38{margin-bottom:10px}",
      "._1yVWfq{margin-left:20px}",
    ]
  `);
  expect(expandMarginPadding('padding', '10px 20px')).toEqual(
    expandShorthandProperties('padding', '10px 20px', ''),
  );
  expect(expandMarginPadding('padding', '10px 20px').map(printNodes)).toMatchInlineSnapshot(`
    Array [
      "._2h8fCA{padding-top:10px}",
      "._3PTJRo{padding-right:20px}",
      "._1Dvao8{padding-bottom:10px}",
      "._2EBnAo{padding-left:20px}",
    ]
  `);

  // 3) three values
  expect(expandMarginPadding('margin', '10px 20px 30px')).toEqual(
    expandShorthandProperties('margin', '10px 20px 30px', ''),
  );
  expect(expandMarginPadding('margin', '10px 20px 30px').map(printNodes)).toMatchInlineSnapshot(`
    Array [
      "._3sgLnu{margin-top:10px}",
      "._4098WN{margin-right:20px}",
      "._2ynoCr{margin-bottom:30px}",
      "._1yVWfq{margin-left:20px}",
    ]
  `);
  expect(expandMarginPadding('padding', '10px 20px 30px')).toEqual(
    expandShorthandProperties('padding', '10px 20px 30px', ''),
  );
  expect(expandMarginPadding('padding', '10px 20px 30px').map(printNodes)).toMatchInlineSnapshot(`
    Array [
      "._2h8fCA{padding-top:10px}",
      "._3PTJRo{padding-right:20px}",
      "._2iKTDO{padding-bottom:30px}",
      "._2EBnAo{padding-left:20px}",
    ]
  `);

  // 4) four values
  expect(expandMarginPadding('margin', '10px 20px 30px 40px')).toEqual(
    expandShorthandProperties('margin', '10px 20px 30px 40px', ''),
  );
  expect(expandMarginPadding('margin', '10px 20px 30px 40px').map(printNodes))
    .toMatchInlineSnapshot(`
    Array [
      "._3sgLnu{margin-top:10px}",
      "._4098WN{margin-right:20px}",
      "._2ynoCr{margin-bottom:30px}",
      "._2frFkL{margin-left:40px}",
    ]
  `);
  expect(expandMarginPadding('padding', '10px 20px 30px 40px')).toEqual(
    expandShorthandProperties('padding', '10px 20px 30px 40px', ''),
  );
  expect(expandMarginPadding('padding', '10px 20px 30px 40px').map(printNodes))
    .toMatchInlineSnapshot(`
    Array [
      "._2h8fCA{padding-top:10px}",
      "._3PTJRo{padding-right:20px}",
      "._2iKTDO{padding-bottom:30px}",
      "._3I54Zi{padding-left:40px}",
    ]
  `);
});
