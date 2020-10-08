// @flow

import StyleCollectorNode from '../StyleCollectorNode';
import StyleCollectorPseudoNode from '../StyleCollectorPseudoNode';

it('works as expected', () => {
  const node = new StyleCollectorPseudoNode(
    ':hover',
    new Map([
      ['c0', new StyleCollectorNode('color', 'red')],
      ['c1', new StyleCollectorNode('color', 'lime')],
      ['c2', new StyleCollectorNode('color', 'blue')],
    ]),
  );
  expect(node.getPseudo()).toBe(':hover');

  expect(node.print()).toMatchInlineSnapshot(
    `".wUqnh:hover{color:#f00}.y21qO:hover{color:#0f0}._4fo5TC:hover{color:#00f}"`,
  );
  expect(node.print({ bumpSpecificity: true })).toMatchInlineSnapshot(
    `".wUqnh.wUqnh:hover{color:#f00}.y21qO.y21qO:hover{color:#0f0}._4fo5TC._4fo5TC:hover{color:#00f}"`,
  );
});
