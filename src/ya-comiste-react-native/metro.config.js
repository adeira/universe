/**
 * Metro configuration for React Native
 * https://facebook.github.io/metro/
 *
 * @flow
 */

const path = require('path');

/*::

type MetroConfig = {|
  +watchFolders?: $ReadOnlyArray<string>,
  +resolver?: { ... },
  +transformer?: { ... },
  +serializer?: { ... },
  +server?: { ... },
|};

*/

module.exports = ({
  watchFolders: [
    // root node_modules
    path.resolve(__dirname, '..', '..', 'node_modules'),
    path.resolve(__dirname, '..', 'fetch'), // @adeira/fetch
    path.resolve(__dirname, '..', 'js'), // @adeira/js
  ],
  transformer: {
    getTransformOptions: () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
} /*: MetroConfig */);
