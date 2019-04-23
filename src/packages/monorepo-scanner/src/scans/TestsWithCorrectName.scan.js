// @flow

import fs from 'fs';
import { glob } from '@kiwicom/monorepo';

test('every test should be in the __tests__ folder', done => {
  expect.hasAssertions();

  glob(
    '/**/@(**.test.js|**.spec.js)',
    { root: __SRC_ROOT__ },
    (error, filenames) => {
      if (error) {
        done.fail(error);
      }

      // just to be sure we actually found some files
      expect(filenames.length > 200).toBe(true);

      filenames.forEach(filename => {
        expect(filename).toMatch(/__tests__/);
      });

      done();
    },
  );
});

test('every test should follow the filename conventions', done => {
  expect.hasAssertions();

  glob('/**/__tests__/**.js', { root: __SRC_ROOT__ }, (error, filenames) => {
    if (error) {
      done.fail(error);
    }

    // just to be sure we actually found some files
    expect(filenames.length > 200).toBe(true);

    filenames.forEach(filename => {
      fs.readFile(filename, (err, data) => {
        if (err) {
          throw err;
        }

        if (data.indexOf('expect(') >= 0) {
          // so it's probably a test file
          if (!/.*\.(?:test|spec).*\.js$/.test(filename)) {
            expect(filename).toBe(filename.replace(/\.js$/, '.test.js'));
          }
        }
      });
    });

    done();
  });
});
