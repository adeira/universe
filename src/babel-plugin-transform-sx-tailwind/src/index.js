// @flow

// BEGIN-ADEIRA-UNIVERSE-INTERNAL
require('@babel/register')({
  ignore: [/node_modules\/(?!@adeira)/],
  rootMode: 'upward',
});
// END-ADEIRA-UNIVERSE-INTERNAL

const template = require('@babel/template').default;
const t = require('@babel/types');
const murmurHash = require('@adeira/murmur-hash').default;
const { tailwindStyles } = require('@adeira/sx-tailwind');

const TemplateLiteralHandler = require('./TemplateLiteralHandler').default;

module.exports = function sxTailwindBabelPlugin() /*: any */ {
  let stylesCollector = [];
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
      CallExpression(path) {
        if (path.node.callee.name === sxtCallee) {
          path.node.arguments.forEach((a) => stylesCollector.push(a.value));
          path.node.callee.name = stylesVarName;
        } else if (path.node.callee.name === tailwindCallee) {
          path.traverse({
            TemplateLiteral(path) {
              TemplateLiteralHandler(path, stylesCollector, stylesVarName);
            },
          });

          if (path.node.arguments.length === 1 && path.node.arguments[0].type === 'StringLiteral') {
            const styles = path.node.arguments[0].value.split(' ').filter((s) => s !== '');
            stylesCollector.push(...styles);

            path.replaceWith(
              t.callExpression(
                t.identifier(stylesVarName),
                styles.map((style) => t.stringLiteral(style)),
              ),
            );
          }
        }
      },
      Program: {
        enter(path, state) {
          stylesCollector = [];
          const filename = state.file.opts.filename.split('/').slice(-2).join('/');
          stylesVarName = `__styles_${murmurHash(filename)}`;
        },
        exit(path) {
          const declarations = Object.fromEntries(
            stylesCollector.map((style) => [style, tailwindStyles[style]]),
          );

          if (Object.keys(declarations).length > 0) {
            path.node.body.push(
              template.ast(`const ${stylesVarName} = sx.create(${JSON.stringify(declarations)})`),
            );
          }

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
