// @flow

// BEGIN-ADEIRA-UNIVERSE-INTERNAL
require('@babel/register')({
  ignore: [/node_modules\/(?!@adeira)/],
  rootMode: 'upward',
});
// END-ADEIRA-UNIVERSE-INTERNAL

const template = require('@babel/template').default;
const murmurHash = require('@adeira/murmur-hash').default;
const childProcess = require('child_process');
const findCacheDir = require('find-cache-dir');
const fs = require('fs');
const path = require('path');
const hash = require('object-hash');

const getCssDeclarations = require('./getCssDeclarations').default;
const TemplateLiteralHandler = require('./TemplateLiteralHandler').default;
const StringLiteralHandler = require('./StringLiteralHandler').default;
const ConditionalExpressionHandler = require('./ConditionalExpressionHandler').default;

const PLUGIN_NAME = 'sx-tailwind-babel-transform';

module.exports = function sxTailwindBabelPlugin() /*: any */ {
  let stylesCollector = [];
  let stylesVarName = 'styles';
  let styles = {};
  let keyframes = {};
  let lastImportPointer;
  let sxImported = false;

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
      JSXAttribute(path) {
        if (path.node.name.name !== 'sxt') {
          return;
        }

        path.traverse({
          TemplateLiteral(path) {
            TemplateLiteralHandler(path, stylesCollector, stylesVarName);
          },
        });

        if (
          path.node.value.type === 'JSXExpressionContainer' &&
          path.node.value.expression.type === 'ConditionalExpression'
        ) {
          ConditionalExpressionHandler(path, stylesCollector, stylesVarName);
        }

        if (path.node.value.type === 'StringLiteral') {
          StringLiteralHandler(path, stylesCollector, stylesVarName);
        }
      },
      ImportDeclaration(path) {
        if (
          path.node.source.value === '@adeira/sx' &&
          path.node.specifiers.find(
            (s) => s.type === 'ImportDefaultSpecifier' && s.local.name === 'sx',
          )
        ) {
          sxImported = true;
        }
        lastImportPointer = path;
      },
      Program: {
        enter(path, state) {
          sxImported = false;
          stylesCollector = [];
          const filename = state.file.opts.filename.split('/').slice(-2).join('/');
          stylesVarName = `__styles_${murmurHash(filename)}`;
        },
        exit(path) {
          const declarations = Object.fromEntries(
            stylesCollector.map((style) => [style, getCssDeclarations(style, keyframes, styles)]),
          );

          if (Object.keys(declarations).length === 0) {
            return;
          }

          if (sxImported === false) {
            lastImportPointer.insertAfter(template.ast(`import sx from '@adeira/sx'`));
          }

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
        },
      },
    },
  };
};

function getCurrentDir() /*: string */ {
  const possibleDirs = [
    './src/babel-plugin-transform-sx-tailwind/src/', // Adeira Universe monorepo
    './node_modules/@adeira/babel-plugin-transform-sx-tailwind/src/', // NPM package
    '../../node_modules/@adeira/babel-plugin-transform-sx-tailwind/src/', // standard monorepo
    '../babel-plugin-transform-sx-tailwind/src/', // Vercel CI
  ];

  const dir = possibleDirs.find((d) => fs.existsSync(d));

  if (dir != null) {
    return dir;
  }

  throw Error(`Error, can't detect current working dir! cwd: ${process.cwd()}`);
}
