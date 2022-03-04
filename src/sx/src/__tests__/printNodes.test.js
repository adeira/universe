// @flow

import printNodes from '../printNodes';
import StyleCollectorAtNode from '../StyleCollectorAtNode';
import StyleCollectorNode from '../StyleCollectorNode';
import StyleCollectorPseudoNode from '../StyleCollectorPseudoNode';

it('prints `StyleCollectorNode` as expected', () => {
  expect(
    printNodes([
      new StyleCollectorNode('color', 'red'),
      new StyleCollectorNode('color', 'green'),
      new StyleCollectorNode('color', 'blue'),
    ]),
  ).toMatchInlineSnapshot(`
    "._324Crd{color:#f00}
    .mRoJ3{color:#008000}
    ._2dHaKY{color:#00f}"
  `);
});

it('prints `StyleCollectorPseudoNode` as expected', () => {
  expect(
    printNodes([
      new StyleCollectorPseudoNode(
        ':hover',
        new Map([
          // TODO: are the map keys necessary (?)
          ['c0', new StyleCollectorNode('color', 'red')],
          ['c1', new StyleCollectorNode('color', 'green')],
          ['c2', new StyleCollectorNode('color', 'blue')],
        ]),
      ),
    ]),
  ).toMatchInlineSnapshot(`
    "._324Crd:hover{color:#f00}
    .mRoJ3:hover{color:#008000}
    ._2dHaKY:hover{color:#00f}"
  `);
});

it('prints `StyleCollectorAtNode` as expected', () => {
  expect(
    printNodes([
      new StyleCollectorAtNode(
        '@media screen',
        new Map([
          ['c0', new StyleCollectorNode('fontSize', '14')],
          [
            'c1',
            new StyleCollectorPseudoNode(
              ':hover',
              new Map([['c0', new StyleCollectorNode('color', 'pink')]]),
            ),
          ],

          [
            'c2',
            new StyleCollectorAtNode(
              '@media (max-width: 12cm)',
              new Map([['c0', new StyleCollectorNode('color', 'blue')]]),
            ),
          ],
        ]),
      ),
    ]),
  ).toMatchInlineSnapshot(`
    "@media screen{
    ._1fVgat._1fVgat{font-size:14}
    ._3ncx7d._3ncx7d:hover{color:#ffc0cb}
    @media (max-width: 12cm){
    ._2dHaKY._2dHaKY{color:#00f}
    }
    }"
  `);
});

// TODO: prefixing
