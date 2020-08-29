// @flow

import path from 'path';
import prettier from 'prettier';
import { generateTestsFromFixtures } from '@adeira/test-utils';

import * as sx from '../../index';
import { styleBuffer, mediaStyleBuffer } from '../styleBuffer';

beforeEach(() => {
  styleBuffer.clear();
  mediaStyleBuffer.clear();
});

generateTestsFromFixtures(path.join(__dirname, 'fixtures'), (input) => {
  sx.create(JSON.parse(input));
  return prettier.format(sx.renderStatic(() => null).css, { filepath: 'test.css' });
});

it('works as expected', () => {
  const styles = sx.create({
    red: { color: 'red' },
    blue: { color: 'blue' },
    pseudo: {
      'color': 'green',
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
    ._14RYUP::after{content:\\"🤓\\"}"
  `);

  expect(styles('red')).toMatchInlineSnapshot(`"wUqnh"`);
  expect(styles('blue')).toMatchInlineSnapshot(`"_4fo5TC"`);

  expect(styles('red', 'blue')).toMatchInlineSnapshot(`"_4fo5TC"`); // blue wins
  expect(styles('blue', 'red')).toMatchInlineSnapshot(`"wUqnh"`); // red wins

  expect(styles('pseudo')).toMatchInlineSnapshot(`"PJDYD _4sFdkU _22QzO9 _3stS2V _14RYUP"`);
  expect(styles('pseudo', 'red')).toMatchInlineSnapshot(`"wUqnh _4sFdkU _22QzO9 _3stS2V _14RYUP"`); // red wins (non-hover)
});

it('supports media queries', () => {
  const styles = sx.create({
    red: {
      'color': 'red',
      '@media print': {
        color: 'red', // can result in the same CSS class and it would be nice to deduplicate it
      },
      '@media (min-width: 30em) and (max-width: 50em)': {
        color: 'blue',
      },
    },
  });

  expect(sx.renderStatic(() => null).css).toMatchInlineSnapshot(
    `".wUqnh{color:#f00}@media print{.wUqnh{color:#f00}} @media (min-width: 30em) and (max-width: 50em){._4fo5TC{color:#00f}}"`,
  );

  expect(styles('red')).toMatchInlineSnapshot(`"wUqnh _4fo5TC"`); // TODO: fix the duplicates
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

it('supports pseudo classes in media queries', () => {
  sx.create({
    media: {
      'color': 'red',
      '@media print': {
        'color': 'red',
        ':hover': {
          color: 'pink',
        },
      },
    },
  });

  expect(prettier.format(sx.renderStatic(() => null).css, { filepath: 'test.css' }))
    .toMatchInlineSnapshot(`
    ".wUqnh {
      color: #f00;
    }
    @media print {
      .wUqnh {
        color: #f00;
      }
      ._4rAdwD:hover {
        color: #ffc0cb;
      }
    }
    "
  `);
});
