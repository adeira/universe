// @flow strict

import renderAtomicClass from '../renderAtomicClass';

it('renders atomic classes as expected', () => {
  const input = {
    className: 'aaa',
    styleName: 'bbb',
    styleValue: 'ccc',
  };
  expect(renderAtomicClass(input)).toMatchInlineSnapshot(`".aaa{bbb:ccc}"`);
  expect(renderAtomicClass({ ...input, bumpSpecificity: true })).toMatchInlineSnapshot(
    `".aaa.aaa{bbb:ccc}"`,
  );

  const inputHover = {
    className: 'aaa',
    styleName: 'bbb',
    styleValue: 'ccc',
    pseudo: ':hover',
  };
  expect(renderAtomicClass(inputHover)).toMatchInlineSnapshot(`".aaa:hover{bbb:ccc}"`);
  expect(renderAtomicClass({ ...inputHover, bumpSpecificity: true })).toMatchInlineSnapshot(
    `".aaa.aaa:hover{bbb:ccc}"`,
  );

  const inputAfter = {
    className: 'aaa',
    styleName: 'bbb',
    styleValue: 'ccc',
    pseudo: '::after',
  };
  expect(renderAtomicClass(inputAfter)).toMatchInlineSnapshot(`".aaa::after{bbb:ccc}"`);
  expect(renderAtomicClass({ ...inputAfter, bumpSpecificity: true })).toMatchInlineSnapshot(
    `".aaa.aaa::after{bbb:ccc}"`,
  );
});
