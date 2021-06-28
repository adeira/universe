/**
 * @generated SignedSource<<92b8545d480d43fa71596c6091c8cc85>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./node_modules/.bin/relay-compiler-experimental
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type useRefetchableFragment$ref: FragmentReference;
declare export opaque type useRefetchableFragment$fragmentType: useRefetchableFragment$ref;
export type useRefetchableFragmentRefetchQueryVariables = {||};
export type useRefetchableFragmentRefetchQueryResponse = {|
  +$fragmentRefs: useRefetchableFragment$ref,
|};
export type useRefetchableFragmentRefetchQuery = {|
  variables: useRefetchableFragmentRefetchQueryVariables,
  response: useRefetchableFragmentRefetchQueryResponse,
|};
*/

var node/*: ConcreteRequest*/ = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "useRefetchableFragmentRefetchQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "useRefetchableFragment"
      }
    ],
    "type": "RootQuery",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "useRefetchableFragmentRefetchQuery",
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
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": "node(id:\"my-id\")"
      }
    ]
  },
  "params": {
    "cacheID": "399ce7cab931a6fa63e5f185adf6efd1",
    "id": null,
    "metadata": {},
    "name": "useRefetchableFragmentRefetchQuery",
    "operationKind": "query",
    "text": "query useRefetchableFragmentRefetchQuery {\n  ...useRefetchableFragment\n}\n\nfragment useRefetchableFragment on RootQuery {\n  node(id: \"my-id\") {\n    __typename\n    id\n  }\n}\n"
  }
};

if (__DEV__) {
  (node/*: any*/).hash = "67fd2ef08aaa2cc38386f875382ee411";
}

module.exports = node;
