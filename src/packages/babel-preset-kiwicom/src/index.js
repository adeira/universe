// @flow strict

const path = require('path');

/*::

type ApiType = {|
  +assertVersion: number => void,
|};

type SupportedTargets = 'js' | 'js-esm' | 'flow';
type Environments = { [string]: string | $ReadOnlyArray<string>, ... };

type ExternalOptions = {|
  +target?: SupportedTargets,
  +environments?: Environments,
  +debug?: boolean,
|};

type InternalOptions = {|
  +target: SupportedTargets,
  +environments: Environments,
  +debug: boolean,
|};

type BabelRule = string | [string, { [name: string]: mixed, ... }];
type BabelRules = $ReadOnlyArray<BabelRule>;

*/

module.exports = (api /*: ApiType */, externalOptions /*: ExternalOptions */) => {
  api.assertVersion(7);

  const options /*: InternalOptions */ = {
    target: externalOptions.target || 'js',
    environments: externalOptions.environments || {
      node: 'current',
      browsers: [
        // https://gitlab.skypicker.com/frontend/frontend/blob/master/webpack.common.js
        'last 2 versions',
        'ie >= 11',
      ],
    },
    debug: externalOptions.debug || false,
  };

  let presets /*: BabelRules */ = [];
  let plugins /*: BabelRules */ = [];
  let parserPlugins /*: Array<string> */ = [
    'jsx',
    'flow',
    'flowComments',
    'dynamicImport', // https://github.com/tc39/proposal-dynamic-import
    'throwExpressions', // https://github.com/tc39/proposal-throw-expressions
  ];
  let retainLines = false;

  const target = options.target;
  if (target === 'flow') {
    plugins = [path.join(__dirname, 'dev-declaration')];
    parserPlugins = parserPlugins.concat([
      // These parser options are relevant only to Flow because JS targets
      // enable them via necessary transpilation plugins.
      'classProperties',
      'classPrivateProperties',
      'nullishCoalescingOperator',
      'objectRestSpread',
      'optionalChaining',
      'numericSeparator',
    ]);
    retainLines = true;
  } else if (target === 'js' || target === 'js-esm') {
    const supportsESM = target === 'js-esm';
    presets = [
      [
        '@babel/preset-env',
        {
          debug: options.debug,
          modules: supportsESM ? false : 'commonjs',
          targets: options.environments,
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
      // see: https://babeljs.io/docs/en/babel-parser#plugins
      // Candidates: classPrivateMethods, v8intrinsic (__DEV__)
      plugins: parserPlugins,
    },
    retainLines,
    // TODO: sourceType: 'unambiguous',
  };
};
