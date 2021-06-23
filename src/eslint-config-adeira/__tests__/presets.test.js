// @flow

const propertyMatchers = {
  settings: {
    react: {
      version: expect.any(String),
    },
  },
};

test('jest preset', () => {
  const preset = require('../jest');

  expect(preset).toMatchSnapshot(propertyMatchers, 'Jest preset');
});

test('base preset', () => {
  const preset = require('../base');

  expect(preset).toMatchSnapshot(propertyMatchers, 'Base preset');
});

test('react preset', () => {
  const preset = require('../react');

  expect(preset).toMatchSnapshot(propertyMatchers, 'React preset');
});

test('flowtype preset', () => {
  const preset = require('../flowtype');

  expect(preset).toMatchSnapshot(propertyMatchers, 'Flowtype preset');
});

test('relay preset', () => {
  const preset = require('../relay');

  expect(preset).toMatchSnapshot(propertyMatchers, 'Relay preset');
});
