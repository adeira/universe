// @flow

import StyleCollectorNode from '../StyleCollectorNode';

it('works as expected', () => {
  const node = new StyleCollectorNode('color', 'red');
  expect(node.getHash()).toBe('wUqnh');
  expect(node.getStyleName()).toBe('color');
  expect(node.getStyleValue()).toBe('#f00');
  expect(node.print()).toBe('.wUqnh{color:#f00}');
  expect(node.print({ pseudo: ':hover' })).toBe('.wUqnh:hover{color:#f00}');
  expect(
    node.print({
      pseudo: ':hover',
      bumpSpecificity: true,
    }),
  ).toBe('.wUqnh.wUqnh:hover{color:#f00}');
});
