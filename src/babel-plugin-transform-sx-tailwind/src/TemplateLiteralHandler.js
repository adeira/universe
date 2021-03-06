// @flow

const t = require('@babel/types');

export default function TemplateLiteralHandler(
  path /*: any */,
  stylesCollector /*: any[] */,
  stylesVarName /*: string */,
) {
  if (path.node.expressions.length === 0) {
    // Simple template literal without any expressions
    const classNames = path.node.quasis.map((q) => q.value.raw).join(' ');
    path.parentPath.replaceWith(t.StringLiteral(classNames));
  } else {
    // some expressions inside of the template literal
    const conditionals = path.node.expressions
      .filter(
        ({ type, consequent, alternate }) =>
          type === 'ConditionalExpression' &&
          ['TemplateLiteral', 'StringLiteral'].includes(consequent.type) &&
          ['TemplateLiteral', 'StringLiteral'].includes(alternate.type),
      )
      .map((e) => {
        e.consequent = t.ArrayExpression(getStringLiterals(e.consequent));
        e.alternate = t.ArrayExpression(getStringLiterals(e.alternate));
        stylesCollector.push(
          ...e.consequent.elements.map((s) => s.value),
          ...e.alternate.elements.map((s) => s.value),
        );
        return e;
      });

    // Get all quasis and expressions sorted as they were in the original code
    const args = new Map(conditionals.map((c) => [c.start, t.SpreadElement(c)]));
    path.node.quasis.forEach((q) => {
      const literals = getStringLiterals(q);
      stylesCollector.push(...literals.map((l) => l.value));
      args.set(q.start, literals);
    });

    const sortedArgs = Array.from(args.keys())
      .sort()
      .map((i) => args.get(i))
      .flat();

    const jsxExpression = getJsxExpression(path, sortedArgs, stylesVarName);
    const jsxAttribute = t.jsxAttribute(
      t.jsxIdentifier('className'),
      t.jsxExpressionContainer(jsxExpression),
    );
    path.parentPath.parentPath.replaceWith(jsxAttribute);
  }
}

function getJsxExpression(path, sortedArgs, stylesVarName) {
  const callExpressions = path.node.expressions.filter((e) => e.type === 'CallExpression');
  if (callExpressions.length === 0) {
    return t.callExpression(t.identifier(stylesVarName), sortedArgs);
  }

  const expressions = [
    t.callExpression(t.identifier(stylesVarName), sortedArgs),
    ...callExpressions,
  ].sort((a, b) => a.start - b.start);

  const quasis = expressions.map((e, i) => t.templateElement({ raw: i === 0 ? '' : ' ' }));
  quasis.push(t.templateElement({ raw: '' }, true));

  return t.templateLiteral(quasis, expressions);
}

function getStringLiterals(input) {
  if (!['StringLiteral', 'TemplateElement', 'TemplateLiteral'].includes(input.type)) {
    return [];
  }
  const strings =
    // eslint-disable-next-line no-nested-ternary
    input.type === 'StringLiteral'
      ? input.value.split(' ')
      : input.type === 'TemplateLiteral'
      ? input.quasis.map((q) => q.value.raw.split(' ')).flat()
      : input.value.raw.split(' ');
  return strings.filter((s) => s !== '').map((s) => t.StringLiteral(s));
}
