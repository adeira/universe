/**
 * @flow
 */

/* eslint-disable */

import type { ConcreteRequest } from 'relay-runtime';
export type usersQueryVariables = {||};
export type usersQueryResponse = {|
  +listUsers: $ReadOnlyArray<{|
    +id: string
  |}>
|};
export type usersQuery = {|
  variables: usersQueryVariables,
  response: usersQueryResponse,
|};

/*
query usersQuery {
  listUsers {
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "AnyUser",
    "kind": "LinkedField",
    "name": "listUsers",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "usersQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "usersQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "fad0a34a01dad8f38108642a18ee7c3e",
    "id": null,
    "metadata": {},
    "name": "usersQuery",
    "operationKind": "query",
    "text": "query usersQuery {\n  listUsers {\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '0ce7ae2ea5afc34c20b816438a487560';
export default node;
