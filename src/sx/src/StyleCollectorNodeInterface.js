// @flow strict

export type PrintConfig = {|
  +pseudo?: string,
  +bumpSpecificity?: boolean,
  +trailingSemicolon?: boolean, // https://github.com/thysultan/stylis.js/issues/250
|};

export interface StyleCollectorNodeInterface {
  addNodes(nodes: Map<string, StyleCollectorNodeInterface>): void;
  printNodes(config?: PrintConfig): $ReadOnlyArray<string>;
}
