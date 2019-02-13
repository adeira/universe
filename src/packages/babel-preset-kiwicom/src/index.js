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

  if (options.target !== 'js' && options.target !== 'flow') {
    throw new Error('options.target must be one of "js" or "flow".');
  }

  let presets /*: BabelRules */ = [];
  let plugins /*: BabelRules */ = [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-syntax-flow', // allow parsing of the flow syntax (overlaps with flow-strip-types for JS)
    '@babel/plugin-syntax-jsx', // overlaps with babel-plugin-relay for JS
  ];

  if (options.target === 'flow') {
    plugins = plugins.concat([path.join(__dirname, 'dev-declaration')]);
  }

  if (options.target === 'js') {
    presets = presets.concat([
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
    ]);
    plugins = plugins.concat([
      path.join(__dirname, 'dev-expression.js'),
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-transform-flow-strip-types',
      'babel-plugin-relay',
    ]);
  }

  return {
    presets,
    plugins,
  };
};
