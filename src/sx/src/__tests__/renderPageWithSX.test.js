// @flow

import sx from '../../index';
import StyleCollector from '../StyleCollector';

afterEach(() => {
  StyleCollector.reset();
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
        content: '"🤓"',
      },
    },
  });

  expect(styles('red')).toMatchInlineSnapshot(`"_324Crd"`);
  expect(styles('blue')).toMatchInlineSnapshot(`"_2dHaKY"`);

  expect(styles('red', 'blue')).toMatchInlineSnapshot(`"_2dHaKY"`); // blue wins
  expect(styles('blue', 'red')).toMatchInlineSnapshot(`"_324Crd"`); // red wins

  expect(styles('pseudo')).toMatchInlineSnapshot(`"mRoJ3 _1O0igU crve5 _2DlVUN _3Wiz8a"`);
  expect(styles('pseudo', 'red')).toMatchInlineSnapshot(`"_324Crd _1O0igU crve5 _2DlVUN _3Wiz8a"`); // red wins (non-hover)
});

it('does not output conflicting classes', () => {
  const styles = sx.create({
    aaa: {
      margin: 0, // expanded to margin-top, margin-left, margin-bottom and margin-right
    },
    bbb: { marginTop: 10 },
  });

  expect(styles('aaa')).toMatchInlineSnapshot(`"_4pgUgJ _37wPvZ _32zari _3DMcik"`);
  expect(styles('bbb')).toMatchInlineSnapshot(`"_3sgLnu"`);

  expect(styles('aaa', 'bbb')).toMatchInlineSnapshot(`"_3sgLnu _37wPvZ _32zari _3DMcik"`);
  expect(styles('bbb', 'aaa')).toBe(styles('aaa'));
  expect(styles('aaa', 'aaa')).toBe(styles('aaa'));
});
