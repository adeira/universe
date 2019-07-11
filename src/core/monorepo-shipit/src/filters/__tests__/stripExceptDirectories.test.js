// @flow strict-local

import stripExceptDirectories from '../stripExceptDirectories';
import Changeset from '../../Changeset';

test.each([
  [['foo'], ['foo/bar', 'herp/derp'], ['foo/bar']],
  [['foo/'], ['foo/bar', 'herp/derp'], ['foo/bar']],
  [['foo'], ['foo/bar', 'foobaz'], ['foo/bar']],
  [['foo', 'herp'], ['foo/bar', 'herp/derp', 'baz'], ['foo/bar', 'herp/derp']],
])('strips packages outside of the defined scope correctly: %#', (roots, inputPaths, expected) => {
  const changeset = new Changeset().withDiffs(
    new Set(inputPaths.map(path => ({ path, body: 'placeholder' }))),
  );
  const diffs = stripExceptDirectories(changeset, roots).getDiffs();
  expect([...diffs].map(diff => diff.path)).toEqual(expected);
});
