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
    "._2Iiue4{color:red}
    ._4rU9YR{color:blue}
    ._2Iiue4:hover{color:red}
    ._4rU9YR:focus{color:blue}
    ._3NgSZx:focus{font-size:2rem}"
  `);

  expect(styles('red')).toMatchInlineSnapshot(`"_2Iiue4"`);
  expect(styles('blue')).toMatchInlineSnapshot(`"_4rU9YR"`);

  expect(styles('red', 'blue')).toMatchInlineSnapshot(`"_2Iiue4 _4rU9YR"`);
  expect(styles('blue', 'red')).toMatchInlineSnapshot(`"_4rU9YR _2Iiue4"`);

  expect(styles('red', 'redPseudo')).toMatchInlineSnapshot(`"_2Iiue4 _4rU9YR _3NgSZx"`);
  expect(styles('red', 'blue', 'redPseudo')).toMatchInlineSnapshot(`"_2Iiue4 _4rU9YR _3NgSZx"`);
  expect(styles('red', 'redPseudo', 'blue')).toMatchInlineSnapshot(`"_2Iiue4 _4rU9YR _3NgSZx"`);
  expect(styles('blue', 'red', 'redPseudo')).toMatchInlineSnapshot(`"_4rU9YR _2Iiue4 _3NgSZx"`);
});
