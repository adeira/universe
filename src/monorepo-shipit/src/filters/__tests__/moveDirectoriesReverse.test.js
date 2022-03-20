// @flow

import moveDirectories from '../moveDirectories';
import moveDirectoriesReverse from '../moveDirectoriesReverse';
import Changeset from '../../Changeset';

test.each([
  [
    'second takes precedence (first is more specific)',
    new Map([
      // from => to
      ['foo/public_tld/', ''],
      ['foo/', 'bar/'],
    ]),
    ['foo/orig_root_file', 'foo/public_tld/public_root_file'],
    ['bar/orig_root_file', 'public_root_file'],
  ],
  [
    'only one rule applied',
    new Map([
      ['foo/', ''],
      ['bar/', 'project_bar/'],
    ]),
    ['foo/bar/part of project foo', 'bar/part of project bar'],
    [
      'bar/part of project foo', // this shouldn't turn into 'project_bar/part ...'
      'project_bar/part of project bar',
    ],
  ],
  [
    'subdirectories',
    new Map([
      ['foo/test/', 'testing/'],
      ['foo/', ''],
    ]),
    ['foo/test/README', 'foo/src.c'],
    ['testing/README', 'src.c'],
  ],
])('%s', (testName, mapping, inputPaths, expected) => {
  const changeset = new Changeset().withDiffs(
    new Set(inputPaths.map((path) => ({ path, body: 'placeholder' }))),
  );
  const diffs = moveDirectories(changeset, mapping).getDiffs();
  expect([...diffs].map((diff) => diff.path)).toEqual(expected);

  const reversedChangeset = new Changeset().withDiffs(diffs);
  const reversedDiffs = moveDirectoriesReverse(reversedChangeset, mapping).getDiffs();
  expect([...reversedDiffs].map((diff) => diff.path)).toEqual(inputPaths);
});

it('throw exception when mapping contains duplicate destinations', () => {
  // Please note: this is technically OK for normal mapping. However, it's
  // not possible to revers such a mapping because it's not clear how
  // should be the paths restored.
  const changeset = new Changeset();
  const brokenMapping = new Map([
    ['foo/', 'duplicate/'],
    ['bar/', 'duplicate/'],
  ]);
  expect(() => moveDirectoriesReverse(changeset, brokenMapping)).toThrow(
    'It is not possible to reverse mapping with duplicate destinations.',
  );
});
