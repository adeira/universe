// @flow strict

import path from 'path';

import type { ConfigType } from '../../../../ConfigType.flow';

module.exports = ({
  customImportitFilter: (changeset) => changeset,
  customShipitFilter: (changeset) => changeset,
  getStrippedFiles() {
    return new Set([/asdasd/]);
  },
  getBranchConfig() {
    return {
      source: 'origin/main',
      destination: 'main',
    };
  },
  getStaticConfig() {
    return {
      repository: 'git@github.com/adeira/relay-example.git',
    };
  },
  getPathMappings() {
    const ossRoot = 'src/apps/example-relay/';
    return new Map([
      [path.join(ossRoot, '__github__', '.flowconfig'), '.flowconfig'],
      [ossRoot, ''],
    ]);
  },
}: ConfigType);
