// @flow strict-local

import Changeset from '../../src/Changeset';
import ShipitConfig from '../../src/ShipitConfig';
import requireAndValidateConfig from '../../src/requireAndValidateConfig';

jest.mock('fs');

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
      expect(...outputDataset.getDiffs()).toEqual({
        body: 'mocked',
        path: output,
      });
    }
  });
}
