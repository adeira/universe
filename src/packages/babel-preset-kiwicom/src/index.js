// @flow

const path = require('path');

/*::

type ApiType = {|
  +assertVersion: number => void,
|}

type ExternalOptions = {|
  +target: 'js' | 'flow',
|}

type BabelRule = string | [string, Object];
type BabelRules = $ReadOnlyArray<BabelRule>;

*/

module.exports = (
  api /*: ApiType */,
  externalOptions /*: ExternalOptions */,
) => {
  api.assertVersion(7);

  const options = {
    target: 'js',
    ...externalOptions,
  };

  let presets /*: BabelRules */ = [];
  let plugins /*: BabelRules */ = [];

  if (options.target === 'flow') {
    plugins = [path.join(__dirname, 'dev-declaration')];
  } else if (options.target === 'js') {
    presets = [
      [
        '@babel/preset-env',
        {
          modules: 'commonjs',
          targets: {
            node: 'current',
          },
        },
      ],
      '@babel/preset-react',
    ];
    plugins = [
      path.join(__dirname, 'dev-expression.js'),
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-nullish-coalescing-operator',
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-transform-flow-strip-types',
      '@kiwicom/babel-plugin-orbit-components',
      'babel-plugin-relay',
    ];
  } else {
    throw new Error('options.target must be one of "js" or "flow".');
  }

  return {
    presets,
    plugins,
    parserOpts: {
      plugins: [
        'jsx',
        'flow',
        // Enable parsing of (not transpilation) - necessary for Flow target:
        'classProperties',
        'nullishCoalescingOperator',
        'objectRestSpread',
        'optionalChaining',

        // see: https://babeljs.io/docs/en/babel-parser#plugins
        // Candidates: numericSeparator, classPrivateProperties, classPrivateMethods
      ],
    },
  };
};
