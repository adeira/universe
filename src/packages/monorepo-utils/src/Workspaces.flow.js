// @flow

export type WorkspaceDependencies = {
  [string]: {|
    +location: string,
    +workspaceDependencies: $ReadOnlyArray<string>,
    +mismatchedWorkspaceDependencies: $ReadOnlyArray<string>,
  |},
  ...,
};
