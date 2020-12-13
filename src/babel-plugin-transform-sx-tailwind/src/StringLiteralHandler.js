// @flow

const t = require('@babel/types');

export default function TemplateLiteralHandler(
  path /*: any */,
  stylesCollector /*: any[] */,
  stylesVarName /*: string */,
) {
  const styles = path.node.value.value.split(' ').filter((s) => s !== '');
  stylesCollector.push(...styles);

  path.replaceWith(
    t.jsxAttribute(
      t.jsxIdentifier('className'),
      t.JSXExpressionContainer(
        t.callExpression(
          t.identifier(stylesVarName),
          styles.map((style) => t.stringLiteral(style)),
        ),
      ),
    ),
  );
}
