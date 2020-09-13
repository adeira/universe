// @flow

import csstree from 'css-tree';
import * as changeCase from 'change-case';

const NOT_SUPPORTED_PROPS = new Set([
  'grid-gap',
  'grid-row-gap',
  'grid-column-gap',
  'pointer-events',
]);
const UNITLESS_PROPS = new Set(['line-height', 'font-size']);

export default function generateSX(css: string | Buffer): { +[key: string]: any, ... } {
  const ast = csstree.parse(css);
  const styles = walk(ast);
  return reorderMediaQueries(styles);
}

function walk(ast: { +[key: string]: any, ... }): { +[key: string]: any, ... } {
  const styles = {};
  csstree.walk(ast, {
    enter(node) {
      if (node.type === 'Atrule') {
        if (!node.visited) {
          const name = `@${node.name} ${csstree.generate(node.prelude)}`;
          const rules = walk(node.block);
          if (Object.keys(rules).length === 0) {
            return;
          }
          styles[name] = { ...rules };
          node.visited = true;
        }
      }
      if (node.type === 'Rule') {
        if (!node.visited) {
          const className = getClassName(node);
          const pseudoClassSelector = getPseudoSelectorName(node);
          const declarations = getDeclarations(node);

          if (className == null || declarations.size === 0 || pseudoClassSelector === ':not') {
            return;
          }

          styles[className] =
            pseudoClassSelector != null
              ? { [pseudoClassSelector]: Object.fromEntries(declarations) }
              : Object.fromEntries(declarations);

          node.visited = true;
        }
      }
    },
  });

  return styles;
}

function reorderMediaQueries(styles: { +[key: string]: any, ... }): { +[key: string]: any, ... } {
  const reStyles = {};
  Object.entries(styles).forEach(([key, rules]) => {
    if (key.startsWith('@media ')) {
      // $FlowExpectedError[incompatible-call]
      Object.entries(reorderMediaQueries(rules)).forEach(([className, rules]) => {
        reStyles[className] = addOrMergeRules(reStyles, className, { [key]: rules });
      });
    } else {
      reStyles[key] = addOrMergeRules(reStyles, key, rules);
    }
  });
  return reStyles;
}

function addOrMergeRules(styles, key, rules) {
  return styles[key] ? { ...styles[key], ...rules } : rules;
}

function getDeclarations(rule: { +[key: string]: any, ... }): Map<string, string | number> {
  const declarations = new Map();
  rule.block.children
    .filter((i) => i.type === 'Declaration')
    .filter(({ property }) => isSupportedProp(property))
    .forEach(({ property, value }) => {
      const sxProperty = changeCase.camelCase(property);
      const sxValue = getSXValue(value, property);

      if (!declarations.has(sxProperty) && !isVendorPrefixed(sxValue)) {
        declarations.set(sxProperty, sxValue);
      }
    });

  return declarations;
}

function getClassName(rule: { +[key: string]: any, ... }): ?string {
  const classSelector = rule.prelude.children
    .first()
    .children.filter((i) => i.type === 'ClassSelector')
    .first();

  return classSelector?.name?.replace(/\\/g, '');
}

function getPseudoSelectorName(rule: { +[key: string]: any, ... }): ?string {
  const pseudoSelector = rule.prelude.children
    .first()
    .children.filter((i) => i.type === 'PseudoClassSelector')
    .first();

  return pseudoSelector == null ? null : `:${pseudoSelector.name}`;
}

function getSXValue(value: { +[key: string]: any, ... }, property: string): string | number {
  if (
    UNITLESS_PROPS.has(property) &&
    value.type === 'Value' &&
    value.children.getSize() === 1 &&
    value.children.first().type === 'Dimension'
  ) {
    return Number(value.children.first().value);
  }

  return value.type === 'Value' &&
    value.children.getSize() === 1 &&
    value.children.first().type === 'Number'
    ? Number(value.children.first().value)
    : csstree.generate(value);
}

function isSupportedProp(property: string): boolean {
  return (
    !property.startsWith('--') && !isVendorPrefixed(property) && !NOT_SUPPORTED_PROPS.has(property)
  );
}

function isVendorPrefixed(value: string | number): boolean {
  if (typeof value !== 'string') {
    return false;
  }
  return (
    value.startsWith('-moz-') ||
    value.startsWith('-o-') ||
    value.startsWith('-ms-') ||
    value.startsWith('-webkit-')
  );
}
