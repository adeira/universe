// @flow strict

const path = require('path');

/*::

type ApiType = {|
  +assertVersion: number => void,
|};

type SupportedTargets = 'js' | 'js-esm' | 'flow';

type ExternalOptions = {|
  +target?: SupportedTargets,
|};

type InternalOptions = {|
  +target: SupportedTargets,
|};

type BabelRule = string | [string, { [name: string]: mixed }];
type BabelRules = $ReadOnlyArray<BabelRule>;

*/

module.exports = (
  api /*: ApiType */,
  externalOptions /*: ExternalOptions */,
) => {
  api.assertVersion(7);

  const options /*: InternalOptions */ = {
    target: 'js',
    ...externalOptions,
  };

  let presets /*: BabelRules */ = [];
  let plugins /*: BabelRules */ = [];
  let retainLines = false;

  const target = options.target;

  if (target === 'flow') {
    plugins = [path.join(__dirname, 'dev-declaration')];
    retainLines = true;
  } else if (target === 'js' || target === 'js-esm') {
    const supportsESM = target === 'js-esm';
    presets = [
      [
        '@babel/preset-env',
        {
          modules: supportsESM ? false : 'commonjs',
          targets: {
            node: 'current',
            browsers: ['last 2 versions', 'ie >= 11'], // https://gitlab.skypicker.com/frontend/frontend/blob/master/webpack.common.js
          },
          // TODO - loose: true (?)
        },
      ],
      '@babel/preset-react',
    ];
    plugins = [
      path.join(__dirname, 'dev-expression.js'),
      path.join(__dirname, 'kiwicom-js-invariant.js'),
      path.join(__dirname, 'kiwicom-js-warning.js'),
      '@babel/plugin-transform-flow-strip-types', // https://github.com/babel/babel/issues/8417
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-nullish-coalescing-operator',
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-proposal-numeric-separator',
      // Transform runtime plugin turns common chunks of code into imports. However, this
      // requires `@babel/runtime` dependency thus we are requiring it as well.
      // See: https://babeljs.io/docs/en/babel-plugin-transform-runtime
      [
        '@babel/plugin-transform-runtime',
        {
          useESModules: supportsESM,
        },
      ],
      '@kiwicom/babel-plugin-orbit-components',
    ];
  } else {
    /*:: (target: empty) */
    throw new Error('options.target must be one of "js" or "flow".');
  }

  return {
    presets,
    plugins,
    parserOpts: {
      plugins: [
        'jsx',
        'flow',
        'flowComments',
        // Enable parsing of (not transpilation) - necessary for Flow target:
        'classProperties',
        'classPrivateProperties',
        'dynamicImport',
        'nullishCoalescingOperator',
        'objectRestSpread',
        'optionalChaining',
        'numericSeparator',

        // see: https://babeljs.io/docs/en/babel-parser#plugins
        // Candidates: throwExpressions, classPrivateMethods
      ],
    },
    retainLines,
    // TODO: sourceType: 'unambiguous',
  };
};
