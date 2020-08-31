// @flow

import template from '@babel/template';
import * as t from '@babel/types';
import murmurHash from '@adeira/murmur-hash';
import { tailwindStyles } from '@adeira/sx-tailwind';

module.exports = function sxTailwindBabelPlugin(): any {
  const styles = [];
  let tailwindCallee = '';
  let sxtCallee = '';
  let stylesVarName = 'styles';

  return {
    name: 'sx-tailwind-babel-transform',
    visitor: {
      ImportDeclaration(path) {
        if (path.node.source.value === '@adeira/sx-tailwind') {
          path.node.specifiers.forEach(({ imported, local }) => {
            if (imported.name === 'tailwind') {
              tailwindCallee = local.name;
            } else if (imported.name === 'sxt') {
              sxtCallee = local.name;
            }
          });

          const sxImport = template.ast(`import * as sx from '@adeira/sx'`);
          path.replaceWith(sxImport);
        }
      },
      JSXAttribute(path) {
        if (
          path.node?.name?.type !== 'JSXIdentifier' ||
          path.node.name?.name !== 'className' ||
          path.node.value?.type !== 'JSXExpressionContainer' ||
          path.node.value.expression?.type !== 'CallExpression' ||
          path.node.value.expression?.callee?.type !== 'Identifier'
        ) {
          return;
        }
        if (path.node.value.expression.callee.name === sxtCallee) {
          path.node.value.expression.arguments.forEach((a) => styles.push(a.value));
          path.node.value.expression.callee.name = stylesVarName;
        } else if (path.node.value.expression.callee.name === tailwindCallee) {
          path.node.value.expression.arguments[0].value
            .split(' ')
            .forEach((style) => styles.push(style));

          const attribute = t.jsxAttribute(
            t.jsxIdentifier('className'),
            t.jsxExpressionContainer(
              t.callExpression(
                t.identifier(stylesVarName),
                styles.map((style) => t.stringLiteral(style)),
              ),
            ),
          );
          path.replaceWith(attribute);
        }
      },
      Program: {
        enter(path, state) {
          const filename = state.file.opts.filename.split('/').slice(-2).join('/');
          stylesVarName = `__styles_${murmurHash(filename)}`;
        },
        exit(path) {
          const declarations = Object.fromEntries(
            styles.map((style) => [style, tailwindStyles[style]]),
          );
          if (Object.keys(declarations).length === 0) {
            return;
          }

          path.node.body.push(
            template.ast(`const ${stylesVarName} = sx.create(${JSON.stringify(declarations)})`),
          );

          // is there SX imported twice?
          const sxImports = path.node.body.reduce((a, { type, source, specifiers }, index) => {
            if (
              type === 'ImportDeclaration' &&
              source.value === '@adeira/sx' &&
              Array.isArray(specifiers) &&
              specifiers[0].type === 'ImportNamespaceSpecifier'
            ) {
              a.push(index);
            }
            return a;
          }, []);
          if (sxImports.length > 1) {
            delete path.node.body[sxImports[0]];
          }
        },
      },
    },
  };
};
