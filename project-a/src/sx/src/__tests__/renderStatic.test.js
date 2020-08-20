// @flow

import sx, { renderStatic } from '../../index';

it('works as expected', () => {
  const styles = sx.create({
    red: { color: 'red' },
    blue: { color: 'blue' },
    redPseudo: sx.pseudo({
      hover: { color: 'red' },
      focus: {
        color: 'blue',
        fontSize: 32,
      },
    }),
  });

  expect(
    renderStatic(() => null)
      .css.split(' ')
      .join('\n'),
  ).toMatchInlineSnapshot(`
    ".XV7OP{color:red}
    ._4ut9aF{color:blue}
    ._2RYg40:hover{color:red}
    ._2OQH2W:focus{color:blue}
    ._1cWYLU:focus{font-size:2rem}"
  `);

  expect(styles('red')).toMatchInlineSnapshot(`"XV7OP"`);
  expect(styles('blue')).toMatchInlineSnapshot(`"_4ut9aF"`);

  expect(styles('red', 'blue')).toMatchInlineSnapshot(`"XV7OP _4ut9aF"`);
  expect(styles('blue', 'red')).toMatchInlineSnapshot(`"_4ut9aF XV7OP"`);

  expect(styles('red', 'redPseudo')).toMatchInlineSnapshot(`"XV7OP _2RYg40 _2OQH2W _1cWYLU"`);
  expect(styles('red', 'blue', 'redPseudo')).toMatchInlineSnapshot(
    `"XV7OP _4ut9aF _2RYg40 _2OQH2W _1cWYLU"`,
  );
  expect(styles('red', 'redPseudo', 'blue')).toMatchInlineSnapshot(
    `"XV7OP _2RYg40 _2OQH2W _1cWYLU _4ut9aF"`,
  );
  expect(styles('blue', 'red', 'redPseudo')).toMatchInlineSnapshot(
    `"_4ut9aF XV7OP _2RYg40 _2OQH2W _1cWYLU"`,
  );
});
