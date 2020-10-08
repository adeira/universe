// @flow

import StyleCollectorAtNode from '../StyleCollectorAtNode';
import StyleCollectorNode from '../StyleCollectorNode';
import StyleCollectorPseudoNode from '../StyleCollectorPseudoNode';

it('works as expected', () => {
  const node = new StyleCollectorAtNode(
    '@media print',
    new Map([
      ['c0', new StyleCollectorNode('color', 'red')],
      [
        ':hover',
        new StyleCollectorPseudoNode(
          ':hover',
          new Map([['c0', new StyleCollectorNode('color', 'blue')]]),
        ),
      ],
    ]),
  );

  expect(node.print()).toMatchInlineSnapshot(
    `"@media print{.wUqnh.wUqnh{color:#f00}._4fo5TC._4fo5TC:hover{color:#00f}}"`,
  );
});
