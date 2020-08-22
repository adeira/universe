// @flow

import prettier from 'prettier';

import * as sx from '../../index';
import { styleBuffer, mediaStyleBuffer } from '../styleBuffer';

beforeEach(() => {
  styleBuffer.clear();
  mediaStyleBuffer.clear();
});

it('works as expected', () => {
  const styles = sx.create({
    red: { color: 'red' },
    blue: {
      color: 'blue',
    },
    media: {
      color: 'red',
      ...sx.media('@media (min-width: 600px)', {
        color: 'blue',
        marginRight: '2px',
      }),
    },
    pseudo: {
      color: 'green',
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
    },
  });

  expect(
    sx
      .renderStatic(() => null)
      .css.split(' ')
      .join('\n'),
  ).toMatchInlineSnapshot(`
    ".wUqnh{color:#f00}
    ._4fo5TC{color:#00f}
    .PJDYD{color:#008000}
    ._4sFdkU:hover{color:#f00}
    ._22QzO9:hover{text-decoration:underline}
    ._3stS2V:focus{color:#800080}
    ._14RYUP::after{content:\\"🤓\\"}@media(min-width:600px){._1Zlcse{color:#00f}
    ._2N3qFR{margin-right:2px}}"
  `);

  expect(styles('red')).toMatchInlineSnapshot(`"wUqnh"`);
  expect(styles('blue')).toMatchInlineSnapshot(`"_4fo5TC"`);
  expect(styles('media')).toMatchInlineSnapshot(`"wUqnh _1Zlcse _2N3qFR"`);

  expect(styles('red', 'blue')).toMatchInlineSnapshot(`"_4fo5TC"`); // blue wins
  expect(styles('blue', 'red')).toMatchInlineSnapshot(`"wUqnh"`); // red wins

  expect(styles('pseudo')).toMatchInlineSnapshot(`"PJDYD _4sFdkU _22QzO9 _3stS2V _14RYUP"`);
  expect(styles('pseudo', 'red')).toMatchInlineSnapshot(`"wUqnh _4sFdkU _22QzO9 _3stS2V _14RYUP"`); // red wins (non-hover)
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
