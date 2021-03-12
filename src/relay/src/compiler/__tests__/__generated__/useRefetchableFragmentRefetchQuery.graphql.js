/**
 * @flow
 */

/* eslint-disable */

import type { ConcreteRequest } from 'relay-runtime';
type useRefetchableFragment$ref = any;
export type useRefetchableFragmentRefetchQueryVariables = {||};
export type useRefetchableFragmentRefetchQueryResponse = {|
  +$fragmentRefs: useRefetchableFragment$ref
|};
export type useRefetchableFragmentRefetchQuery = {|
  variables: useRefetchableFragmentRefetchQueryVariables,
  response: useRefetchableFragmentRefetchQueryResponse,
|};

/*
query useRefetchableFragmentRefetchQuery {
  ...useRefetchableFragment
}

fragment useRefetchableFragment on RootQuery {
  node(id: "my-id") {
    __typename
    id
  }
}
*/

const node: ConcreteRequest = {
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
// prettier-ignore
(node: any).hash = '67fd2ef08aaa2cc38386f875382ee411';
export default node;
