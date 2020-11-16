// @flow

import expandOverflow from '../expandOverflow';
import printNodes from './printNodes';

it('expands overflow as expected', () => {
  expect(expandOverflow('overflow', 'visible').map(printNodes)).toMatchInlineSnapshot(`
    Array [
      "._25umgG{overflow-x:visible}",
      "._2tdzbW{overflow-y:visible}",
    ]
  `);

  expect(expandOverflow('overflow', 'hidden visible').map(printNodes)).toMatchInlineSnapshot(`
    Array [
      "._4x3KLH{overflow-x:hidden}",
      "._2tdzbW{overflow-y:visible}",
    ]
  `);

  expect(expandOverflow('overflow', 'unset').map(printNodes)).toMatchInlineSnapshot(`
    Array [
      "._385HMz{overflow-x:unset}",
      "._1fxwLm{overflow-y:unset}",
    ]
  `);

  // testing nonsense value (should not do anything)
  expect(expandOverflow('overflow', 'aaa bbb ccc').map(printNodes)).toMatchInlineSnapshot(`
    Array [
      "._4y1zXJ{overflow-x:aaa bbb ccc}",
      "._3UWS63{overflow-y:aaa bbb ccc}",
    ]
  `);
});
