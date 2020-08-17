// @flow strict

export type ConfigType = {|
  +getStaticConfig: () => {|
    +repository: string,
  |},
  +getPathMappings: () => Map<string, string>,
  +getStrippedFiles?: () => Set<RegExp>,
  +getBranchConfig?: () => {|
    +source: string,
    +destination: string,
  |},
|};
