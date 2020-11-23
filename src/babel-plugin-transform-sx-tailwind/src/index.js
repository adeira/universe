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
const childProcess = require('child_process');
const findCacheDir = require('find-cache-dir');
const fs = require('fs');
const path = require('path');
const hash = require('object-hash');

const getCssDeclarations = require('./getCssDeclarations').default;
const TemplateLiteralHandler = require('./TemplateLiteralHandler').default;

const PLUGIN_NAME = 'sx-tailwind-babel-transform';

module.exports = function sxTailwindBabelPlugin() /*: any */ {
  let stylesCollector = [];
  let tailwindCallee = '';
  let stylesVarName = 'styles';
  let styles = {};
  let keyframes = {};

  return {
    name: PLUGIN_NAME,
    pre(state) {
      const cacheDir = findCacheDir({ name: PLUGIN_NAME });
      if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir, { recursive: true });
      }
      const options = state.opts.plugins.find((p) => p.key === PLUGIN_NAME).options;
      const cacheFile = path.join(cacheDir, `styles_${hash(options)}.json`);

      if (!fs.existsSync(cacheFile)) {
        // This way async code can be called in sync process (Babel is sync, Tailwind processor async)
        childProcess.execFileSync('node', [
          `${getCurrentDir()}createCache.js`,
          JSON.stringify({ options, cacheFile }),
        ]);
      }

      const cache = require(cacheFile);
      keyframes = cache.keyframes;
      styles = cache.styles;
    },
    visitor: {
      ImportDeclaration(path) {
        if (path.node.source.value === '@adeira/sx-tailwind') {
          path.node.specifiers.forEach(({ imported, local }) => {
            if (imported.name === 'tailwind') {
              tailwindCallee = local.name;
            }
          });

          const sxImport = template.ast(`import sx from '@adeira/sx'`);
          path.replaceWith(sxImport);
        }
      },
      CallExpression(path) {
        if (path.node.callee.name === tailwindCallee) {
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
            stylesCollector.map((style) => [style, getCssDeclarations(style, keyframes, styles)]),
          );

          if (Object.keys(declarations).length > 0) {
            path.node.body.push(
              template.ast(`const ${stylesVarName} = sx.create(${JSON.stringify(declarations)})`),
            );
            // if animation is used, transform "sx.keyframe" string into call expression
            path.traverse({
              ObjectProperty(path) {
                if (
                  typeof path.node.key.value !== 'string' ||
                  !path.node.key.value.startsWith('--animation-name-')
                ) {
                  return;
                }
                const sxKeyframe = template.ast(path.node.value.value);
                path.node.value = sxKeyframe.expression;
              },
            });
          }

          // is there SX imported twice?
          const sxImports = path.node.body.reduce((a, { type, source, specifiers }, index) => {
            if (
              type === 'ImportDeclaration' &&
              source.value === '@adeira/sx' &&
              Array.isArray(specifiers) &&
              specifiers[0].type === 'ImportDefaultSpecifier'
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

function getCurrentDir() /*: string */ {
  const monorepoDir = './src/babel-plugin-transform-sx-tailwind/src/';
  const packageDir = './node_modules/@adeira/babel-plugin-transform-sx-tailwind/src/';
  const vercelDir = '../babel-plugin-transform-sx-tailwind/src/';

  if (fs.existsSync(monorepoDir)) {
    return monorepoDir;
  }

  if (fs.existsSync(packageDir)) {
    return packageDir;
  }

  if (fs.existsSync(vercelDir)) {
    return vercelDir;
  }

  throw Error(`Error, can't detect current working dir! cwd: ${process.cwd()}`);
}
