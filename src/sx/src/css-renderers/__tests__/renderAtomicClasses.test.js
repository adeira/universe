// @flow strict

import renderAtomicClasses from '../renderAtomicClasses';

it('renders atomic classes as expected', () => {
  expect(
    renderAtomicClasses([
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
  ).toMatchInlineSnapshot(`".aaa{bbb:ccc} .aaa:hover{bbb:ccc} .aaa::after{bbb:ccc}"`);
});
