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

it('supports multiple styles', () => {
  // Why is this important? See:
  // https://youtu.be/9JZHodNR184?t=334

  expect(
    create({
      red: { color: 'red' },
      blue: { color: 'blue' },
    })('red', 'blue'),
  ).toBe(`${hashStyle('{"color":"red"}')} ${hashStyle('{"color":"blue"}')}`);

  expect(
    create({
      red: { color: 'red' },
      blue: { color: 'blue' },
    })('blue', 'red'),
  ).toBe(`${hashStyle('{"color":"blue"}')} ${hashStyle('{"color":"red"}')}`);

  // changed order of style definitions:
  expect(
    create({
      blue: { color: 'blue' },
      red: { color: 'red' },
    })('blue', 'red'),
  ).toBe(`${hashStyle('{"color":"blue"}')} ${hashStyle('{"color":"red"}')}`);

  expect(
    create({
      blue: { color: 'blue' },
      red: { color: 'red' },
    })('red', 'blue'),
  ).toBe(`${hashStyle('{"color":"red"}')} ${hashStyle('{"color":"blue"}')}`);

  // multiple styles:
  expect(
    create({
      red: { color: 'red', zIndex: 1 },
      blue: { color: 'blue' },
    })('red', 'blue'),
  ).toBe(
    `${hashStyle('{"color":"red"}')} ${hashStyle('{"zIndex":1}')} ${hashStyle('{"color":"blue"}')}`,
  );

  expect(
    create({
      red: { color: 'red', zIndex: 1 },
      blue: { color: 'blue' },
    })('blue', 'red'),
  ).toBe(
    `${hashStyle('{"color":"blue"}')} ${hashStyle('{"color":"red"}')} ${hashStyle('{"zIndex":1}')}`,
  );
});
