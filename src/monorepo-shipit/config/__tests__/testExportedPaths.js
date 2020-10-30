// @flow strict-local

import fs from 'fs';
import path from 'path';
import { findMonorepoRoot } from '@adeira/monorepo-utils';

import Changeset from '../../src/Changeset';
import ShipitConfig from '../../src/ShipitConfig';
import requireAndValidateConfig from '../../src/requireAndValidateConfig';

// eslint-disable-next-line jest/no-export
export default function testExportedPaths(
  configPath: string,
  mapping: $ReadOnlyArray<
    [
      string,
      string | void, // void describes deleted file
    ],
  >,
) {
  const config = requireAndValidateConfig(configPath);
  const monorepoRoot = findMonorepoRoot();

  test.each(mapping)('mapping: %s -> %s', (input, output) => {
    const defaultFilter = new ShipitConfig(
      'mocked repo path',
      'mocked repo URL',
      config.getPathMappings(),
      config.getStrippedFiles ? config.getStrippedFiles() : new Set(),
    ).getDefaultShipitFilter();

    const inputChangeset = new Changeset().withDiffs(new Set([{ path: input, body: 'mocked' }]));

    const outputDataset = defaultFilter(inputChangeset);

    if (output === undefined) {
      expect(...outputDataset.getDiffs()).toBeUndefined();
    } else {
      // 1. verify the path we are testing actually exists (and therefore the test makes sense)
      expect(fs.existsSync(path.join(monorepoRoot, input))).toBe(true);

      // 2. make sure it's being exported correctly
      expect(...outputDataset.getDiffs()).toEqual({
        body: 'mocked',
        path: output,
      });
    }
  });
}
