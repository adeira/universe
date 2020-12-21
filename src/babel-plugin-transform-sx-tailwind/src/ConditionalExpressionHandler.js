// @flow

const t = require('@babel/types');

export default function ConditionalExpressionHandler(
  path /*: any */,
  stylesCollector /*: any[] */,
  stylesVarName /*: string */,
) {
  const expression = path.node.value.expression;
  if (
    expression.consequent.type !== 'StringLiteral' ||
    expression.alternate.type !== 'StringLiteral'
  ) {
    return;
  }

  const consequentStyles = expression.consequent.value.split(' ').filter((s) => s !== '');
  const alternateStyles = expression.alternate.value.split(' ').filter((s) => s !== '');
  stylesCollector.push(...consequentStyles, ...alternateStyles);

  expression.consequent = createArrayExpression(consequentStyles);
  expression.alternate = createArrayExpression(alternateStyles);

  path.replaceWith(
    t.jsxAttribute(
      t.jsxIdentifier('className'),
      t.JSXExpressionContainer(
        t.callExpression(t.identifier(stylesVarName), [t.SpreadElement(expression)]),
      ),
    ),
  );
}

function createArrayExpression(styles: string[]) {
  return t.ArrayExpression(styles.map((s) => t.StringLiteral(s)));
}
