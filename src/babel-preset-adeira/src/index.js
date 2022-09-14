// @flow strict

const path = require('path');

/*::

type ApiType = {
  +assertVersion: number => void,
};

type SupportedTargets = 'js' | 'js-esm' | 'flow';
type Environments = { +[string]: string | $ReadOnlyArray<string>, ... };

type ExternalOptions = {
  +target?: SupportedTargets,
  +environments?: Environments,
  +debug?: boolean,
  +reactRuntime?: 'automatic' | 'classic',
};

type InternalOptions = {
  +target: SupportedTargets,
  +environments: Environments,
  +debug: boolean,
  +reactRuntime: 'automatic' | 'classic',
};

type BabelRule = string | [string, { +[name: string]: mixed, ... }];
type BabelRules = $ReadOnlyArray<BabelRule>;

*/

module.exports = (
  api /*: ApiType */,
  externalOptions /*: ExternalOptions */,
) /*: { +plugins: BabelRules, ... } */ => {
  api.assertVersion(7);

  const options /*: InternalOptions */ = {
    target: externalOptions.target ?? 'js',
    environments: externalOptions.environments ?? {
      // npx browserslist 'cover 90%, not dead, maintained node versions'
      // https://browsersl.ist/#q=cover+90%25%2C+not+dead%2C+maintained+node+versions
      browsers: 'cover 90%, not dead, maintained node versions',
    },
    debug: externalOptions.debug ?? false,
    reactRuntime: externalOptions.reactRuntime ?? 'automatic',
  };

  let presets /*: BabelRules */ = [];
  let plugins /*: BabelRules */ = [path.join(__dirname, 'dev-expression-check.js')];
  const parserPlugins /*: $ReadOnlyArray<string | [string, { +[string]: boolean }]> */ = [
    // See: https://babeljs.io/docs/en/babel-parser#plugins
    'jsx',
    ['flow', { enums: true }],
    'flowComments',
    'throwExpressions', // https://github.com/tc39/proposal-throw-expressions
  ];
  let retainLines = false;

  const target = options.target;
  if (target === 'flow') {
    plugins = plugins.concat([path.join(__dirname, 'dev-declaration.js')]);
    retainLines = true;
  } else if (target === 'js' || target === 'js-esm') {
    const supportsESM = target === 'js-esm';
    presets = presets.concat([
      [
        '@babel/preset-env',
        {
          debug: options.debug,
          modules: supportsESM ? false : 'commonjs',
          targets: options.environments,
          bugfixes: true,
        },
      ],
      [
        '@babel/preset-react',
        {
          runtime: options.reactRuntime,
        },
      ],
    ]);
    plugins = plugins.concat([
      path.join(__dirname, 'dev-expression.js'),
      path.join(__dirname, 'adeira-js-invariant.js'),
      path.join(__dirname, 'adeira-js-warning.js'),
      'babel-plugin-transform-flow-enums',
      [
        '@babel/plugin-transform-flow-strip-types',
        {
          // See: https://babeljs.io/docs/en/babel-plugin-transform-flow-strip-types#allowdeclarefields
          // See: https://github.com/babel/babel/pull/11178
          // See: https://github.com/facebook/flow/commit/11b7adbf85ea237cfc01d1b8dc6f6dcdbc299157
          allowDeclareFields: true,
        },
      ],
      '@babel/plugin-proposal-throw-expressions',
      // Transform runtime plugin turns common chunks of code into imports. However, this
      // requires `@babel/runtime` dependency thus we are requiring it as well.
      // See: https://babeljs.io/docs/en/babel-plugin-transform-runtime
      [
        '@babel/plugin-transform-runtime',
        {
          useESModules: supportsESM,
        },
      ],
    ]);
  } else {
    /*:: (target: empty) */
    throw new Error('options.target must be one of "js", "js-esm" or "flow".');
  }

  return {
    presets,
    plugins,
    parserOpts: {
      plugins: parserPlugins,
    },
    retainLines,
    // TODO: sourceType: 'unambiguous',
  };
};
