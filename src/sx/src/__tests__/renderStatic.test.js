// @flow

import prettier from 'prettier';

import * as sx from '../../index';
import { styleBuffer, mediaStyleBuffer } from '../styleBuffer';

beforeEach(() => {
  styleBuffer.clear();
  mediaStyleBuffer.clear();
});

it('supports pseudo classes', () => {
  sx.create({
    link: { color: 'red' },
    linkHover: sx.pseudo({
      ':hover': { color: 'blue' },
    }),
  });

  expect(
    sx
      .renderStatic(() => null)
      .css.split(' ')
      .join('\n'),
  ).toMatchInlineSnapshot(`
    ".wUqnh{color:#f00}
    .UddGc:hover{color:#00f}"
  `);
});

it('works as expected', () => {
  const styles = sx.create({
    red: { color: 'red' },
    blue: { color: 'blue' },
    pseudo: sx.pseudo({
      ':hover': {
        color: 'red',
        textDecoration: 'underline',
      },
      ':focus': {
        color: 'purple',
      },
      '::after': {
        content: '🤓',
      },
    }),
  });

  expect(
    sx
      .renderStatic(() => null)
      .css.split(' ')
      .join('\n'),
  ).toMatchInlineSnapshot(`
    ".wUqnh{color:#f00}
    ._4fo5TC{color:#00f}
    ._4sFdkU:hover{color:#f00}
    ._22QzO9:hover{text-decoration:underline}
    ._3stS2V:focus{color:#800080}
    ._14RYUP::after{content:\\"🤓\\"}"
  `);

  expect(styles('red')).toMatchInlineSnapshot(`"wUqnh"`);
  expect(styles('blue')).toMatchInlineSnapshot(`"_4fo5TC"`);

  expect(styles('red', 'blue')).toMatchInlineSnapshot(`"_4fo5TC"`); // blue wins
  expect(styles('blue', 'red')).toMatchInlineSnapshot(`"wUqnh"`); // red wins

  expect(styles('pseudo')).toMatchInlineSnapshot(`"_4sFdkU _22QzO9 _3stS2V _14RYUP"`);
  expect(styles('pseudo', 'red')).toMatchInlineSnapshot(`"_4sFdkU _22QzO9 _3stS2V _14RYUP wUqnh"`);
});

it('renders media queries properly', () => {
  mediaStyleBuffer.set(
    '@media(max-width:500px)',
    new Map([['aaaHash', { styleName: 'color', styleValue: '#fff' }]]),
  );

  mediaStyleBuffer.set(
    '@media(max-width:1000px)',
    new Map([
      ['aaaHash', { styleName: 'color', styleValue: '#fff' }],
      ['bbbHash', { styleName: 'color', styleValue: '#000' }],
    ]),
  );

  expect(prettier.format(sx.renderStatic(() => null).css, { filepath: 'test.css' }))
    .toMatchInlineSnapshot(`
    "@media (max-width: 500px) {
      .aaaHash {
        color: #fff;
      }
    }
    @media (max-width: 1000px) {
      .aaaHash {
        color: #fff;
      }
      .bbbHash {
        color: #000;
      }
    }
    "
  `);
});
