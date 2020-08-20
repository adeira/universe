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
    "._3YIoOd{color:red}
    ._1m8jIp{color:blue}
    ._3YIoOd:hover{color:red}
    ._1m8jIp:focus{color:blue}
    ._444sSt:focus{font-size:2rem}"
  `);

  expect(styles('red')).toMatchInlineSnapshot(`"_3YIoOd"`);
  expect(styles('blue')).toMatchInlineSnapshot(`"_1m8jIp"`);

  expect(styles('red', 'blue')).toMatchInlineSnapshot(`"_3YIoOd _1m8jIp"`);
  expect(styles('blue', 'red')).toMatchInlineSnapshot(`"_1m8jIp _3YIoOd"`);

  expect(styles('red', 'redPseudo')).toMatchInlineSnapshot(`"_3YIoOd _1m8jIp _444sSt"`);
  expect(styles('red', 'blue', 'redPseudo')).toMatchInlineSnapshot(`"_3YIoOd _1m8jIp _444sSt"`);
  expect(styles('red', 'redPseudo', 'blue')).toMatchInlineSnapshot(`"_3YIoOd _1m8jIp _444sSt"`);
  expect(styles('blue', 'red', 'redPseudo')).toMatchInlineSnapshot(`"_1m8jIp _3YIoOd _444sSt"`);
});
