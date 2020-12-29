/**
 * @flow
 */

/* eslint-disable */

import type { ConcreteRequest } from 'relay-runtime';
export type NavigationQueryVariables = {||};
export type NavigationQueryResponse = {|
  +whoami: {|
    +id: ?string
  |}
|};
export type NavigationQuery = {|
  variables: NavigationQueryVariables,
  response: NavigationQueryResponse,
|};

/*
query NavigationQuery {
  whoami {
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "WhoamiPayload",
    "kind": "LinkedField",
    "name": "whoami",
    "plural": false,
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
    "name": "NavigationQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "NavigationQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "801b3bcf7eb85d9e1cbc4b5123e4524c",
    "id": null,
    "metadata": {},
    "name": "NavigationQuery",
    "operationKind": "query",
    "text": "query NavigationQuery {\n  whoami {\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '860156c1562305699158db0dc89f7b18';
export default node;
