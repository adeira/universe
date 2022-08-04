// @flow strict

export type PrintConfig = {
  +pseudo?: string,
  +bumpSpecificity?: boolean,
};

export interface StyleCollectorNodeInterface {
  addNodes(nodes: Map<string, StyleCollectorNodeInterface>): void;
  getNodes(): Map<string, StyleCollectorNodeInterface>;
}
