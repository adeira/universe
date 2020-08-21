// @flow

import sx from '../../index';

it('works as expected', () => {
  const styles = sx.create({
    red: { color: 'red' },
    blue: { color: 'blue' },
    pseudo: {
      color: 'green',
      ':hover': {
        color: 'red',
        textDecoration: 'underline',
      },
      ':focus': {
        color: 'purple',
      },
      '::after': {
        content: '🤓',
      },
    },
  });

  expect(
    sx
      .renderStatic(() => null)
      .css.split(' ')
      .join('\n'),
  ).toMatchInlineSnapshot(`
    ".wUqnh{color:red}
    ._4fo5TC{color:blue}
    .PJDYD{color:green}
    ._4sFdkU:hover{color:red}
    ._22QzO9:hover{text-decoration:underline}
    ._3stS2V:focus{color:purple}
    ._14RYUP::after{content:\\"🤓\\"}"
  `);

  expect(styles('red')).toMatchInlineSnapshot(`"wUqnh"`);
  expect(styles('blue')).toMatchInlineSnapshot(`"_4fo5TC"`);

  expect(styles('red', 'blue')).toMatchInlineSnapshot(`"_4fo5TC"`); // blue wins
  expect(styles('blue', 'red')).toMatchInlineSnapshot(`"wUqnh"`); // red wins

  expect(styles('pseudo')).toMatchInlineSnapshot(`"PJDYD _4sFdkU _22QzO9 _3stS2V _14RYUP"`);
  expect(styles('pseudo', 'red')).toMatchInlineSnapshot(`"wUqnh _4sFdkU _22QzO9 _3stS2V _14RYUP"`); // red wins (non-hover)
});
