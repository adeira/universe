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

  expect(styles('aaa')).toMatchInlineSnapshot(`"kO7Od"`);
  expect(styles('bbb')).toMatchInlineSnapshot(`"kO7Od XVfeR"`);
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
    `"_324Crd"`,
  );
  expect(create({ red: { color: 'red' }, blue: { color: 'blue' } })('blue')).toMatchInlineSnapshot(
    `"_2dHaKY"`,
  );

  expect(
    create({
      red: { color: 'red' },
      blue: { color: 'blue' },
    })('red', 'blue'),
  ).toMatchInlineSnapshot(`"_2dHaKY"`); // result should be only BLUE

  expect(
    create({
      red: { color: 'red' },
      blue: { color: 'blue' },
    })('blue', 'red'),
  ).toMatchInlineSnapshot(`"_324Crd"`); // result should be only RED

  // changed order of style definitions:
  expect(
    create({
      blue: { color: 'blue' },
      red: { color: 'red' },
    })('blue', 'red'),
  ).toMatchInlineSnapshot(`"_324Crd"`);

  expect(
    create({
      blue: { color: 'blue' },
      red: { color: 'red' },
    })('red', 'blue'),
  ).toMatchInlineSnapshot(`"_2dHaKY"`);

  // multiple styles:
  expect(
    create({
      red: { color: 'red', zIndex: 1 },
      blue: { color: 'blue' },
    })('red', 'blue'),
  ).toMatchInlineSnapshot(`"_2dHaKY _1SymEZ"`); // blue + zIndex

  expect(
    create({
      red: { color: 'red', zIndex: 1 },
      blue: { color: 'blue' },
    })('blue', 'red'),
  ).toMatchInlineSnapshot(`"_324Crd _1SymEZ"`); // red + zIndex
});

it('supports conditional calls', () => {
  const isDisabled = false;
  const isEnabled = !isDisabled;

  const styles = create({
    button: { color: 'red' }, // wUqnh
    disabled: { color: 'blue' }, // _4fo5TC
  });

  expect(styles('button', 'disabled')).toMatchInlineSnapshot(`"_2dHaKY"`); // disabled wins
  expect(styles('button', isDisabled ? 'disabled' : null)).toMatchInlineSnapshot(`"_324Crd"`);
  expect(styles('button', isDisabled ? 'disabled' : undefined)).toMatchInlineSnapshot(`"_324Crd"`);
  expect(styles('button', isDisabled && 'disabled')).toMatchInlineSnapshot(`"_324Crd"`);
  expect(styles('button', isEnabled && 'disabled')).toMatchInlineSnapshot(`"_2dHaKY"`);

  // alternative syntax:
  expect(() => styles({ button: false })).not.toThrowError();
  expect(styles({ button: false })).toBeUndefined();
  expect(styles({ button: true })).toMatchInlineSnapshot(`"_324Crd"`);
  expect(styles({ button: true, disabled: isDisabled })).toMatchInlineSnapshot(`"_324Crd"`);
  expect(styles({ button: true, disabled: isEnabled })).toMatchInlineSnapshot(`"_2dHaKY"`);
});

it('validates incorrect usage', () => {
  expect(() => create({})).toThrowErrorMatchingInlineSnapshot(
    `"Function 'sx.create' cannot be called with empty stylesheet definition."`,
  );

  const styles = create({
    aaa: { color: 'red' },
    bbb: { color: 'blue' },
    empty: {
      // intentionally empty (useful when user wants to temporarily comment out the stylesheet)
    },
  });

  // $FlowExpectedError[incompatible-call] unexpected yadada
  expect(() => styles({}, 'yadada')).toThrowErrorMatchingInlineSnapshot(
    `"SX accepts only one argument when using conditional objects. Either remove the second argument or switch to traditional syntax without conditional objects."`,
  );

  expect(() => styles({})).toThrowErrorMatchingInlineSnapshot(
    `"SX must be called with at least one stylesheet selector (empty object given)."`,
  );

  expect(() => styles()).toThrowErrorMatchingInlineSnapshot(
    `"SX must be called with at least one stylesheet name."`,
  );

  // $FlowExpectedError[incompatible-call] unexpected bbc
  expect(() => styles('bbc')).toThrowErrorMatchingInlineSnapshot(
    `"SX was called with 'bbc' stylesheet name but it doesn't exist. Did you mean 'bbb' instead?"`,
  );

  // $FlowExpectedError[incompatible-call] unexpected ccc
  expect(() => styles('ccc')).toThrowErrorMatchingInlineSnapshot(
    `"SX was called with 'ccc' stylesheet name but it doesn't exist. Did you mean 'aaa' instead?"`,
  );

  expect(() => styles('empty')).not.toThrow();
  expect(styles('empty')).toBe('');
});
