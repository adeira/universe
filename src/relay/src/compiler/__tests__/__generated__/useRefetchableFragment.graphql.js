/**
 * @flow
 */

/* eslint-disable */

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type useRefetchableFragment$ref: FragmentReference;
declare export opaque type useRefetchableFragment$fragmentType: useRefetchableFragment$ref;
export type useRefetchableFragment = {|
  +node: ?{|
    +__typename: string
  |},
  +$refType: useRefetchableFragment$ref,
|};
export type useRefetchableFragment$data = useRefetchableFragment;
export type useRefetchableFragment$key = {
  +$data?: useRefetchableFragment$data,
  +$fragmentRefs: useRefetchableFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "refetch": {
      "connection": null,
      "fragmentPathInResult": [],
      "operation": require('./useRefetchableFragmentRefetchQuery.graphql.js').default
    }
  },
  "name": "useRefetchableFragment",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "id",
          "value": "my-id"
        }
      ],
      "concreteType": null,
      "kind": "LinkedField",
      "name": "node",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "__typename",
          "storageKey": null
        }
      ],
      "storageKey": "node(id:\"my-id\")"
    }
  ],
  "type": "RootQuery",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = '67fd2ef08aaa2cc38386f875382ee411';
export default node;
