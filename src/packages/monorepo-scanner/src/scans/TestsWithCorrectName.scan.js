// @flow

import { globSync } from '@kiwicom/monorepo';

test('every test should be in the __tests__ folder', () => {
  expect.hasAssertions();

  const filenames = globSync('/**/@(**.test.js|**.spec.js)', {
    root: __SRC_ROOT__,
  });

  filenames.forEach(filename => {
    expect(filename).toMatch(/__tests__/);
  });
});
