// @flow

import create from '../create';

it('returns sx function', () => {
  expect(create({ aaa: { color: 'red' } })).toBeInstanceOf(Function);
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

it('validates incorrect usage', () => {
  expect(() => create({})).toThrowErrorMatchingInlineSnapshot(
    `"Function 'sx.create' cannot be called with empty stylesheet definition."`,
  );
  expect(() => create({ aaa: {} })).toThrowErrorMatchingInlineSnapshot(
    `"Stylesheet 'aaa' must have at least one CSS property."`,
  );

  // $FlowExpectedError[prop-missing] ccc
  const styles = create({
    aaa: { color: 'red' },
    bbb: { color: 'blue' },
  });
  expect(() => styles()).toThrowErrorMatchingInlineSnapshot(
    `"SX must be called with at least one stylesheet name."`,
  );
  expect(() => styles('ccc')).toThrowErrorMatchingInlineSnapshot(
    `"SX was called with 'ccc' stylesheet name but it doesn't exist. Available names are: [\\"aaa\\",\\"bbb\\"]"`,
  );
});
