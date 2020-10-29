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
    `"._324Crd:hover{color:#f00}._9MIuv:hover{color:#0f0}._2dHaKY:hover{color:#00f}"`,
  );
  expect(node.print({ bumpSpecificity: true })).toMatchInlineSnapshot(
    `"._324Crd._324Crd:hover{color:#f00}._9MIuv._9MIuv:hover{color:#0f0}._2dHaKY._2dHaKY:hover{color:#00f}"`,
  );
});
