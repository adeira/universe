// @flow

import path from 'path';

import preset from '../index';

const supportedTargets = ['js', 'js-esm', 'flow'];

const apiMock = {
  assertVersion: version => {
    if (version !== 7) {
      throw new Error(
        'Only Babel API version 7 supported, given version: ' + version,
      );
    }
  },
};

expect.addSnapshotSerializer({
  test: () => true,
  print: value => {
    const cwd = path.join(__dirname, '..', '..'); // root of our Babel Preset
    return JSON.stringify(value, null, 2).replace(
      new RegExp(cwd, 'g'),
      '<BABEL_PRESET_ROOT>',
    );
  },
});

test.each(supportedTargets)(
  "preset with target '%s' emits correct config",
  target => {
    expect(preset(apiMock, { target })).toMatchSnapshot();
  },
);
