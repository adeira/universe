// @flow strict

type WatchmanConfig = $ReadOnlyArray<string | WatchmanConfig>;

export default function buildWatchExpression(config: {|
  extensions: $ReadOnlyArray<string>,
  include: $ReadOnlyArray<string>,
  exclude: $ReadOnlyArray<string>,
|}): WatchmanConfig {
  // https://facebook.github.io/watchman/docs/install.html
  return [
    'allof',
    ['type', 'f'],
    ['anyof', ...config.extensions.map(ext => ['suffix', ext])],
    ['anyof', ...config.include.map(include => ['match', include, 'wholename'])],
    ...config.exclude.map(exclude => ['not', ['match', exclude, 'wholename']]),
  ];
}
