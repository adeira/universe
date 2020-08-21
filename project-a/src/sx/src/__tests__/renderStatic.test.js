// @flow

import sx, { renderStatic } from '../../index';

it('works as expected', () => {
  const styles = sx.create({
    red: { color: 'red' },
    blue: { color: 'blue' },
    // TODO
    // redPseudo: sx.pseudo({
    //   hover: { color: 'red' },
    //   focus: {
    //     color: 'blue',
    //     fontSize: 32,
    //   },
    // }),
  });

  expect(
    renderStatic(() => null)
      .css.split(' ')
      .join('\n'),
  ).toMatchInlineSnapshot(`
    ".wUqnh{color:red}
    ._4fo5TC{color:blue}"
  `);

  expect(styles('red')).toMatchInlineSnapshot(`"wUqnh"`);
  expect(styles('blue')).toMatchInlineSnapshot(`"_4fo5TC"`);

  expect(styles('red', 'blue')).toMatchInlineSnapshot(`"_4fo5TC"`); // blue wins
  expect(styles('blue', 'red')).toMatchInlineSnapshot(`"wUqnh"`); // red wins

  // TODO
  // expect(styles('red', 'redPseudo')).toMatchInlineSnapshot(`"XV7OP _2RYg40 _2OQH2W _1cWYLU"`);
  // expect(styles('red', 'blue', 'redPseudo')).toMatchInlineSnapshot(
  //   `"XV7OP _4ut9aF _2RYg40 _2OQH2W _1cWYLU"`,
  // );
  // expect(styles('red', 'redPseudo', 'blue')).toMatchInlineSnapshot(
  //   `"XV7OP _2RYg40 _2OQH2W _1cWYLU _4ut9aF"`,
  // );
  // expect(styles('blue', 'red', 'redPseudo')).toMatchInlineSnapshot(
  //   `"_4ut9aF XV7OP _2RYg40 _2OQH2W _1cWYLU"`,
  // );
});
