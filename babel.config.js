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

  return {
    presets: [
      [
        '@kiwicom/babel-preset-kiwicom',
        {
          target: api.caller(isWebpack) ? 'js-esm' : 'js',
        },
      ],
    ],
  };
};
