// @flow

import create from '../create';

it('returns sx function', () => {
  // TODO: disallow empty styles and calling non-existing stylesheets
  expect(create({ aaa: {} })).toBeInstanceOf(Function);
});

it('returns correct style names', () => {
  const styles = create({
    aaa: {
      color: 'white',
    },
    bbb: {
      color: 'white',
      zIndex: 10,
    },
  });

  expect(styles('aaa')).toMatchInlineSnapshot(`"_20MWPt"`);
  expect(styles('bbb')).toMatchInlineSnapshot(`"_20MWPt _3eC2WW"`);
});

it('supports multiple styles', () => {
  // It's very important to merge the styles properly to solve their precedence (overwriting):
  //
  //  blue: { color: 'blue' },
  //  red: { color: 'red' },
  //   +
  //  <div className={styles('red', 'blue')}>blue</div>
  //  <div className={styles('blue', 'red')}>red</div>

  // Some values for reference:
  expect(create({ red: { color: 'red' }, blue: { color: 'blue' } })('red')).toMatchInlineSnapshot(
    `"wUqnh"`,
  );
  expect(create({ red: { color: 'red' }, blue: { color: 'blue' } })('blue')).toMatchInlineSnapshot(
    `"_4fo5TC"`,
  );

  expect(
    create({
      red: { color: 'red' },
      blue: { color: 'blue' },
    })('red', 'blue'),
  ).toMatchInlineSnapshot(`"_4fo5TC"`); // result should be only BLUE

  expect(
    create({
      red: { color: 'red' },
      blue: { color: 'blue' },
    })('blue', 'red'),
  ).toMatchInlineSnapshot(`"wUqnh"`); // result should be only RED

  // changed order of style definitions:
  expect(
    create({
      blue: { color: 'blue' },
      red: { color: 'red' },
    })('blue', 'red'),
  ).toMatchInlineSnapshot(`"wUqnh"`);

  expect(
    create({
      blue: { color: 'blue' },
      red: { color: 'red' },
    })('red', 'blue'),
  ).toMatchInlineSnapshot(`"_4fo5TC"`);

  // multiple styles:
  expect(
    create({
      red: { color: 'red', zIndex: 1 },
      blue: { color: 'blue' },
    })('red', 'blue'),
  ).toMatchInlineSnapshot(`"_4fo5TC _2FdJlr"`); // blue + zIndex

  expect(
    create({
      red: { color: 'red', zIndex: 1 },
      blue: { color: 'blue' },
    })('blue', 'red'),
  ).toMatchInlineSnapshot(`"wUqnh _2FdJlr"`); // red + zIndex
});
