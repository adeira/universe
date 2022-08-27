// @flow

import StyleCollectorNode from '../StyleCollectorNode';

it('works as expected', () => {
  const node = new StyleCollectorNode('color', 'red');
  expect(node.getHash()).toBe('_324Crd');
  expect(node.getStyleName()).toBe('color');
  expect(node.getStyleValue()).toBe('#f00');
  expect(node.printNodes()).toMatchInlineSnapshot(`
    [
      "._324Crd{color:#f00}",
    ]
  `);
  expect(node.printNodes({ pseudo: ':hover' })).toMatchInlineSnapshot(`
    [
      "._324Crd:hover{color:#f00}",
    ]
  `);
  expect(
    node.printNodes({
      pseudo: ':hover',
      bumpSpecificity: true,
    }),
  ).toMatchInlineSnapshot(`
    [
      "._324Crd._324Crd:hover{color:#f00}",
    ]
  `);
});

it('hashed the transformed values rather than raw input', () => {
  const node1 = new StyleCollectorNode('color', 'red');
  const node2 = new StyleCollectorNode('color', '#f00');

  expect(node1.printNodes()).toMatchInlineSnapshot(`
    [
      "._324Crd{color:#f00}",
    ]
  `);
  expect(node2.printNodes()).toMatchInlineSnapshot(`
    [
      "._324Crd{color:#f00}",
    ]
  `);
  expect(node1.printNodes()).toStrictEqual(node2.printNodes());
  expect(node1.getHash()).toBe(node2.getHash());
});
