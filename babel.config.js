// @flow strict

/*::

type ApiType = {
  +assertVersion: number => void,
  +cache: {
    forever: () => void,
  },
  +caller: (Caller => boolean) => boolean,
};

type Caller = {
  +name: string,
};

type BabelConfig = {
  +presets: $ReadOnlyArray<string | [string, { ... }]>,
  +babelrcRoots: $ReadOnlyArray<string>,
};

*/

function isWebpack(caller) /*: boolean %checks */ {
  // https://github.com/babel/babel-loader
  return !!(caller && caller.name === 'babel-loader');
}

module.exports = function (api /*: ApiType */) /*: BabelConfig */ {
  api.assertVersion(7);

  return {
    presets: [
      [
        '@adeira/babel-preset-adeira',
        {
          target: api.caller(isWebpack) ? 'js-esm' : 'js',
        },
      ],
    ],
    babelrcRoots: [
      '.', // keep the root as a root
      './src/*', // also consider all packages and load their .babelrc files.
    ],
  };
};
