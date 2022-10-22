// @flow

import path from 'path';

import { collectFilenames } from '../collectFilenames';

it('correctly resolves the relevant files to be published to NPM', async () => {
  // It is a bit strange to be relying on the package folder structure, but at the same time
  // it's a good way to test that everything works as it should:

  await expect(collectFilenames(path.join(__dirname, '../..'))).resolves.toMatchInlineSnapshot(`
    [
      "LICENSE",
      "src/collectFilenames.js",
      "src/index.js",
      "src/log.js",
      "src/NPM.js",
      "src/transformFileVariants.js",
      "package.json",
      "CHANGELOG.md",
      "README.md",
    ]
  `);
});
