/**
 * @generated SignedSource<<7cc7ff5a40a00f0812409411b5afe249>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./node_modules/.bin/relay-compiler-experimental
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
type useRefetchableFragment$ref = any;
type useRefetchableFragment$fragmentType = any;
export type { useRefetchableFragment$ref, useRefetchableFragment$fragmentType };
export type useRefetchableFragment = {|
  +node: ?{|
    +__typename: string,
  |},
  +$refType: useRefetchableFragment$ref,
|};
export type useRefetchableFragment$data = useRefetchableFragment;
export type useRefetchableFragment$key = {
  +$data?: useRefetchableFragment$data,
  +$fragmentRefs: useRefetchableFragment$ref,
  ...
};
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "refetch": {
      "connection": null,
      "fragmentPathInResult": [],
      "operation": require('./useRefetchableFragmentRefetchQuery.graphql')
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

if (__DEV__) {
  (node/*: any*/).hash = "67fd2ef08aaa2cc38386f875382ee411";
}

module.exports = node;
