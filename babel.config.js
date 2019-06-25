// @flow strict

/*::

type ApiType = {|
  +assertVersion: number => void,
  +cache: {|
    forever: () => void,
  |},
  +caller: (Caller => boolean) => boolean,
|};

type Caller = {|
  +name: string,
|};

*/

function isWebpack(caller) /*: boolean %checks */ {
  // https://github.com/babel/babel-loader
  return !!(caller && caller.name === 'babel-loader');
}

module.exports = function(api /*: ApiType */) {
  api.assertVersion(7);

  // Babel ecosystem is quite complicated to understand properly so these
  // console statements allows us to understand what configs are being loaded.
  // eslint-disable-next-line no-console
  console.warn('Babel: %s', __filename);

  return {
    presets: [
      [
        '@kiwicom/babel-preset-kiwicom',
        {
          target: api.caller(isWebpack) ? 'js-esm' : 'js',
        },
      ],
    ],
    babelrcRoots: [
      '.', // keep the root as a root
      './incubator/*', // also consider monorepo packages from incubator "root" and load their .babelrc files.
    ],
  };
};
