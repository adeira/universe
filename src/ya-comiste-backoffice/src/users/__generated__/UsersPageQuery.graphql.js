/**
 * @flow
 */

/* eslint-disable */

import type { ConcreteRequest } from 'relay-runtime';
export type UsersPageQueryVariables = {||};
export type UsersPageQueryResponse = {|
  +listUsers: $ReadOnlyArray<{|
    +id: string,
    +type: string,
  |}>
|};
export type UsersPageQuery = {|
  variables: UsersPageQueryVariables,
  response: UsersPageQueryResponse,
|};

/*
query UsersPageQuery {
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
    "name": "UsersPageQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "UsersPageQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "ea1d786cd005991a471bbe2944ddb23a",
    "id": null,
    "metadata": {},
    "name": "UsersPageQuery",
    "operationKind": "query",
    "text": "query UsersPageQuery {\n  listUsers {\n    id\n    type\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'c6224038a11c5c22f192352b8e36b983';
export default node;
