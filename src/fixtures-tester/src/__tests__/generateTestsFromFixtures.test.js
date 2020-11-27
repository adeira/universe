// @flow

import path from 'path';

import generateTestsFromFixtures from '../generateTestsFromFixtures';

generateTestsFromFixtures(path.join(__dirname, `/fixtures/simple`), (input) => input.toUpperCase());
generateTestsFromFixtures(path.join(__dirname, `/fixtures/simple`), (input) =>
  Promise.resolve(input.toUpperCase()),
);

generateTestsFromFixtures(
  path.join(__dirname, `/fixtures/simple`),
  (input) => input,
  'custom snapshot name (no modifications)',
);

generateTestsFromFixtures(path.join(__dirname, `/fixtures/simple`), (input) => {
  return {
    payload: JSON.stringify(input),
    // testing pretty object printing
    p: { r: { e: { t: { t: { y: true } } } } },
  };
});

generateTestsFromFixtures(path.join(__dirname, `/fixtures/errors`), () => {
  throw new Error('correctly failed');
});
