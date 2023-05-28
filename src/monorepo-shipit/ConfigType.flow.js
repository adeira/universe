// @flow strict

import Changeset from './src/Changeset';

export type ConfigType = {
  +customShipitFilter?: (Changeset) => Changeset,
  +customImportitFilter?: (Changeset) => Changeset,
  +getStaticConfig: () => {
    +repository: string,
  },
  +getPathMappings: () => Map<string, string>,
  +getStrippedFiles?: () => Set<RegExp>,
  +getBranchConfig?: () => {
    +source: string,
    +destination: string,
  },
};
