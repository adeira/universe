// @flow strict

export type Phase = {
  (): void,
  +readableName: string,
  ...
};
