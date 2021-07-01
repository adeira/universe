// @flow

import expandFlex from '../expandFlex';
import expandShorthandProperties from '../../expandShorthandProperties';
import printNodes from './printNodes';

it('expands flex as expected', () => {
  expect(expandFlex('flex', 1)).toEqual(expandShorthandProperties('flex', 1, ''));
  expect(expandFlex('flex', 1).map(printNodes)).toMatchInlineSnapshot(`
    Array [
      "._1PiKJ8{flex:1}",
    ]
  `);

  // Keyword values
  expect(expandFlex('flex', 'auto')).toEqual(expandShorthandProperties('flex', 'auto', ''));
  expect(expandFlex('flex', 'auto').map(printNodes)).toMatchInlineSnapshot(`
    Array [
      ".TV2t8{flex-grow:1}",
      "._3vr0Oj{flex-shrink:1}",
      "._49Fg6A{flex-basis:auto}",
    ]
  `);

  expect(expandFlex('flex', 'initial')).toEqual(expandShorthandProperties('flex', 'initial', ''));
  expect(expandFlex('flex', 'initial').map(printNodes)).toMatchInlineSnapshot(`
    Array [
      ".viT4x{flex-grow:0}",
      "._3vr0Oj{flex-shrink:1}",
      "._49Fg6A{flex-basis:auto}",
    ]
  `);

  expect(expandFlex('flex', 'none')).toEqual(expandShorthandProperties('flex', 'none', ''));
  expect(expandFlex('flex', 'none').map(printNodes)).toMatchInlineSnapshot(`
    Array [
      ".viT4x{flex-grow:0}",
      "._3LouD0{flex-shrink:0}",
      "._49Fg6A{flex-basis:auto}",
    ]
  `);

  // One value, unitless number: flex-grow
  expect(expandFlex('flex', '2')).toEqual(expandShorthandProperties('flex', '2', ''));
  expect(expandFlex('flex', '2').map(printNodes)).toMatchInlineSnapshot(`
    Array [
      "._2nqNa4{flex-grow:2}",
      "._3vr0Oj{flex-shrink:1}",
      "._17V51Q{flex-basis:0px}",
    ]
  `);

  // One value, width/height: flex-basis
  expect(expandFlex('flex', '10em')).toEqual(expandShorthandProperties('flex', '10em', ''));
  expect(expandFlex('flex', '10em').map(printNodes)).toMatchInlineSnapshot(`
    Array [
      ".viT4x{flex-grow:0}",
      "._3vr0Oj{flex-shrink:1}",
      "._48AWIw{flex-basis:10em}",
    ]
  `);

  expect(expandFlex('flex', '30%')).toEqual(expandShorthandProperties('flex', '30%', ''));
  expect(expandFlex('flex', '30%').map(printNodes)).toMatchInlineSnapshot(`
    Array [
      ".viT4x{flex-grow:0}",
      "._3vr0Oj{flex-shrink:1}",
      "._4t8Ssm{flex-basis:30%}",
    ]
  `);

  expect(expandFlex('flex', 'min-content')).toEqual(
    expandShorthandProperties('flex', 'min-content', ''),
  );
  expect(expandFlex('flex', 'min-content').map(printNodes)).toMatchInlineSnapshot(`
    Array [
      ".viT4x{flex-grow:0}",
      "._3vr0Oj{flex-shrink:1}",
      ".FeX7y{flex-basis:min-content}",
    ]
  `);

  // Two values: flex-grow | flex-basis
  expect(expandFlex('flex', '1 30px')).toEqual(expandShorthandProperties('flex', '1 30px', ''));
  expect(expandFlex('flex', '1 30px').map(printNodes)).toMatchInlineSnapshot(`
    Array [
      ".TV2t8{flex-grow:1}",
      "._3vr0Oj{flex-shrink:1}",
      "._4lbv5h{flex-basis:30px}",
    ]
  `);

  // Two values: flex-grow | flex-shrink
  expect(expandFlex('flex', '2 2')).toEqual(expandShorthandProperties('flex', '2 2', ''));
  expect(expandFlex('flex', '2 2').map(printNodes)).toMatchInlineSnapshot(`
    Array [
      "._2nqNa4{flex-grow:2}",
      "._2jTr3g{flex-shrink:2}",
      "._49Fg6A{flex-basis:auto}",
    ]
  `);

  // Three values: flex-grow | flex-shrink | flex-basis
  expect(expandFlex('flex', '2 2 10%')).toEqual(expandShorthandProperties('flex', '2 2 10%', ''));
  expect(expandFlex('flex', '2 2 10%').map(printNodes)).toMatchInlineSnapshot(`
    Array [
      "._2nqNa4{flex-grow:2}",
      "._2jTr3g{flex-shrink:2}",
      "._2Aix5e{flex-basis:10%}",
    ]
  `);
});
