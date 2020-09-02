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
  const sx = {};

  csstree.walk(ast, {
    enter(node) {
      if (node.type === 'ClassSelector') {
        if (this.atrule != null) {
          return;
        }

        const pseudoClassSelector = getPseudoSelectorName(this.rule);
        const className = node.name.replace(/\\/g, '');
        const declarations = new Map();

        this.rule.block.children
          .filter((i) => i.type === 'Declaration')
          .filter(({ property }) => isSupportedProp(property))
          .forEach(({ property, value }) => {
            const sxProperty = changeCase.camelCase(property);
            const sxValue = getSXValue(value, property);

            if (!declarations.has(sxProperty) && !isVendorPrefixed(sxValue)) {
              declarations.set(sxProperty, sxValue);
            }
          });

        if (declarations.size === 0 || pseudoClassSelector === 'not') {
          return;
        }
        sx[className] =
          pseudoClassSelector != null
            ? { [`:${pseudoClassSelector}`]: Object.fromEntries(declarations) }
            : Object.fromEntries(declarations);
      }
    },
  });

  return sx;
}

function getPseudoSelectorName(rule: { +[key: string]: any, ... }): ?string {
  return rule.prelude.children
    .first()
    .children.filter((i) => i.type === 'PseudoClassSelector')
    .first()?.name;
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
