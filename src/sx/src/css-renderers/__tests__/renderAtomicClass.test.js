// @flow strict

import renderAtomicClass from '../renderAtomicClass';

it('renders atomic classes as expected', () => {
  expect(
    renderAtomicClass({
      className: 'aaa',
      styleName: 'bbb',
      styleValue: 'ccc',
    }),
  ).toMatchInlineSnapshot(`".aaa{bbb:ccc}"`);

  expect(
    renderAtomicClass({
      className: 'aaa',
      styleName: 'bbb',
      styleValue: 'ccc',
      pseudo: ':hover',
    }),
  ).toMatchInlineSnapshot(`".aaa:hover{bbb:ccc}"`);

  expect(
    renderAtomicClass({
      className: 'aaa',
      styleName: 'bbb',
      styleValue: 'ccc',
      pseudo: '::after',
    }),
  ).toMatchInlineSnapshot(`".aaa::after{bbb:ccc}"`);
});
