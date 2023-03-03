// @flow

import fs from 'fs';
import os from 'os';
import path from 'path';

import { collectFilenames } from '../collectFilenames';
import { resetBuildCache } from '../resetBuildCache';

it('correctly resets build cache', async () => {
  const buildCachePath = path.join(os.tmpdir(), 'com.adeira.universe.npm.test');

  fs.mkdirSync(buildCachePath, { recursive: true });
  fs.writeFileSync(path.join(buildCachePath, 'test.txt'), '¡Hola!');

  // Make sure the demo file is there:
  expect(fs.existsSync(buildCachePath)).toBe(true);
  await expect(collectFilenames(buildCachePath)).resolves.toMatchInlineSnapshot(`
    [
      "test.txt",
    ]
  `);

  // Reset the build cache:
  await expect(resetBuildCache(buildCachePath)).resolves.toMatchInlineSnapshot(`undefined`);

  // Make sure the cache folder is gone:
  expect(fs.existsSync(buildCachePath)).toBe(false);
});
