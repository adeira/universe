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
    "._2Iiue4{color:red}
    ._4rU9YR{color:blue}"
  `);

  expect(styles('red')).toMatchInlineSnapshot(`"_2Iiue4"`);
  expect(styles('blue')).toMatchInlineSnapshot(`"_4rU9YR"`);

  expect(styles('red', 'blue')).toMatchInlineSnapshot(`"_2Iiue4 _4rU9YR"`);
  expect(styles('blue', 'red')).toMatchInlineSnapshot(`"_4rU9YR _2Iiue4"`);

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
