/**
 * @flow
 */

/* eslint-disable */

import type { ConcreteRequest } from 'relay-runtime';
export type usersQueryVariables = {||};
export type usersQueryResponse = {|
  +listUsers: $ReadOnlyArray<{|
    +id: string,
    +type: string,
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
    type
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
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "type",
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
    "cacheID": "1f3c81c7459101e6924990f1ef736f9b",
    "id": null,
    "metadata": {},
    "name": "usersQuery",
    "operationKind": "query",
    "text": "query usersQuery {\n  listUsers {\n    id\n    type\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'cf05a69743fbf336f7abad775dbd97ab';
export default node;
