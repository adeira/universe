// @flow

import StyleCollectorNode from '../StyleCollectorNode';
import StyleCollectorPseudoNode from '../StyleCollectorPseudoNode';

it('works as expected', () => {
  const node = new StyleCollectorPseudoNode(
    ':hover',
    new Set([
      new StyleCollectorNode('color', 'red'),
      new StyleCollectorNode('color', 'lime'),
      new StyleCollectorNode('color', 'blue'),
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
