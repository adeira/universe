// @flow

import * as sx from '../../index';
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
