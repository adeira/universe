// @flow

import fs from 'fs';
import snapshotDiff from 'snapshot-diff';

import generatePropertyTypes from '../generatePropertyTypes';
import paths from '../paths';

test('whether our generated files are up to date', (done) => {
  expect.assertions(1);
  const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});

  const versionedFile = fs.readFileSync(paths.propertyTypes, 'utf8');
  generatePropertyTypes((types) => {
    // DO NOT UPDATE THIS SNAPSHOT - it's here just to show you what are the differences. To fix
    // this problem you should regenerate the generated types.
    expect(snapshotDiff(versionedFile, types)).toBe(
      'Snapshot Diff:\nCompared values have no visual difference.',
    );
    done();
  });

  spy.mockRestore();
});
