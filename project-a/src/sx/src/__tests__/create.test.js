// @flow

import create from '../create';
import hashStyle from '../hashStyle';

it('returns sx function', () => {
  expect(create({ aaa: {} })).toBeInstanceOf(Function);
});

it('returns correct style names', () => {
  const styles = create({
    aaa: {},
    bbb: {
      color: 'white',
    },
    ccc: {
      color: 'white',
      zIndex: 10,
    },
  });

  expect(styles('aaa')).toBe('');
  expect(styles('bbb')).toBe(hashStyle('{"color":"white"}'));
  expect(styles('ccc')).toBe(`${hashStyle('{"color":"white"}')} ${hashStyle('{"zIndex":10}')}`);
  expect(styles('ccc')).toMatchInlineSnapshot(`"_1srGyL _4FosMJ"`);
});
