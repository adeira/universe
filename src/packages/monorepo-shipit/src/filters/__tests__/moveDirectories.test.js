// @flow strict

import moveDirectories from '../moveDirectories';
import Changeset from '../../Changeset';

test.each([
  [
    'first takes precedence (first is more specific)',
    new Map([
      // from => to
      ['foo/public_tld/', ''],
      ['foo/', ''],
    ]),
    ['foo/orig_root_file', 'foo/public_tld/public_root_file'],
    ['orig_root_file', 'public_root_file'],
  ],
  [
    // this mapping doesn't make sense given the behavior, just using it to check that order matters
    'first takes precedence (second is more specific)',
    new Map([['foo/', ''], ['foo/public_tld/', '']]),
    ['foo/orig_root_file', 'foo/public_tld/public_root_file'],
    ['orig_root_file', 'public_tld/public_root_file'],
  ],
  [
    'only one rule applied',
    new Map([['foo/', ''], ['bar/', 'project_bar/']]),
    ['foo/bar/part of project foo', 'bar/part of project bar'],
    [
      'bar/part of project foo', // this shouldn't turn into 'project_bar/part of project foo'
      'project_bar/part of project bar',
    ],
  ],
  [
    'missing trailing slashes',
    new Map([['foo', 'bar'], ['xyz/', 'aaa']]),
    ['foo/file', 'foo_baz/file', 'xyz/file'],
    [
      'bar/file',
      'bar_baz/file',
      'aaafile', // this can be a gotcha for someone
    ],
  ],
])('%s', (testName, mapping, inputPaths, expected) => {
  const changeset = new Changeset().withDiffs(
    new Set(inputPaths.map(path => ({ path, body: 'placeholder' }))),
  );
  const diffs = moveDirectories(changeset, mapping).getDiffs();
  expect([...diffs].map(diff => diff.path)).toEqual(expected);
});
