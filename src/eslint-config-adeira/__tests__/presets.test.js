// @flow

test.each([
  ['Base preset', require('../base')],
  ['Flowtype preset', require('../flowtype')],
  ['Jest preset', require('../jest')],
  ['Next preset', require('../next')],
  ['React preset', require('../react')],
  ['Relay preset', require('../relay')],
])('%s', (presetName, preset) => {
  const propertyMatchers = {
    settings: {
      react: {
        version: expect.any(String),
      },
    },
  };

  expect(preset).toMatchSnapshot(propertyMatchers, presetName);
});
