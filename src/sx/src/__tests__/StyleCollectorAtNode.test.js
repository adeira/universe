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

  expect(node.printNodes()).toMatchInlineSnapshot(`
    [
      "@media print{._324Crd._324Crd{color:#f00}._2dHaKY._2dHaKY:hover{color:#00f}}",
    ]
  `);
});
