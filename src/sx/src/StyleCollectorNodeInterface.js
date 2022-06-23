// @flow strict

export type PrintConfig = {
  +pseudo?: string,
  +bumpSpecificity?: boolean,
};

export interface StyleCollectorNodeInterface {
  addNodes(nodes: Map<string, StyleCollectorNodeInterface>): void;
  printNodes(config?: PrintConfig): $ReadOnlyArray<string>;
}
