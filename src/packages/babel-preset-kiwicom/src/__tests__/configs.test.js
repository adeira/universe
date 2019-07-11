// @flow

import path from 'path';

import preset from '../index';

expect.addSnapshotSerializer({
  test: () => true,
  print: value => {
    const cwd = path.join(__dirname, '..', '..'); // root of our Babel Preset
    return JSON.stringify(value, null, 2).replace(new RegExp(cwd, 'g'), '<BABEL_PRESET_ROOT>');
  },
});

const supportedTargets = ['js', 'js-esm', 'flow'];
const environments = [
  undefined, // default values
  { node: 'current' },
  { browsers: ['last 2 versions', 'ie >= 11'] },
];

const matrix = [];
supportedTargets.forEach(function(target) {
  environments.forEach(function(environment) {
    matrix.push([target, environment]);
  });
});

test.each(matrix)(
  "emits correct config for target '%s' and environment '%j'",
  (target, environments) => {
    const apiMock = {
      assertVersion: version => {
        if (version !== 7) {
          throw new Error(`Only Babel API version 7 supported, given version: ${version}`);
        }
      },
    };
    expect(preset(apiMock, { target, environments })).toMatchSnapshot();
  },
);
