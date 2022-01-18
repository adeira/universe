// @flow

test.each([
  ['Base preset', require('../base')],
  ['FBT preset', require('../fbt')],
  ['Flowtype preset', require('../flowtype')],
  ['Jest preset', require('../jest')],
  ['Next preset', require('../next')],
  ['Relay preset', require('../relay')],
])('%s', (presetName, preset) => {
  expect(preset).toMatchSnapshot(presetName);
});

test('React preset', () => {
  const propertyMatchers = {
    settings: {
      react: { version: expect.any(String) },
    },
  };

  expect(require('../react')).toMatchSnapshot(propertyMatchers, 'React preset');
});
