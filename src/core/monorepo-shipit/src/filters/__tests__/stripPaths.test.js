// @flow strict

import stripPaths from '../stripPaths';
import Changeset from '../../Changeset';

test.each([
  ['No change', [], ['foo', 'bar', 'herp/derp', 'herp/derp-derp', 'derp']],
  ['Remove top level file', [/^bar$/], ['foo', 'herp/derp', 'herp/derp-derp', 'derp']],
  ['Remove directory', [/^herp\//], ['foo', 'bar', 'derp']],
  ['Remove file', [/(?:^|\/)derp(?:\/|$)/], ['foo', 'bar', 'herp/derp-derp']],
  ['Multiple patterns', [/^foo$/, /^bar$/], ['herp/derp', 'herp/derp-derp', 'derp']],
])('%s', (testName, stripPatterns, expectedFiles) => {
  const paths = ['foo', 'bar', 'herp/derp', 'herp/derp-derp', 'derp'];
  const changeset = new Changeset().withDiffs(
    new Set(paths.map(path => ({ path, body: 'placeholder' }))),
  );
  const diffs = stripPaths(changeset, stripPatterns).getDiffs();
  expect([...diffs].map(diff => diff.path)).toEqual(expectedFiles);
});
