// @flow strict

import renderMediaQuery from '../renderMediaQuery';

it('renders media queries as expected', () => {
  expect(
    renderMediaQuery('@media print', [
      {
        className: 'aaa',
        styleName: 'bbb',
        styleValue: 'ccc',
      },
      {
        className: 'aaa',
        styleName: 'bbb',
        styleValue: 'ccc',
        pseudo: ':hover',
      },
      {
        className: 'aaa',
        styleName: 'bbb',
        styleValue: 'ccc',
        pseudo: '::after',
      },
    ]),
  ).toMatchInlineSnapshot(`"@media print{.aaa{bbb:ccc} .aaa:hover{bbb:ccc} .aaa::after{bbb:ccc}"`);
});
