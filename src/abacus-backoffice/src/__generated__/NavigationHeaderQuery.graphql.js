/**
 * @flow
 */

/* eslint-disable */

import type { ConcreteRequest } from 'relay-runtime';
export type NavigationHeaderQueryVariables = {||};
export type NavigationHeaderQueryResponse = {|
  +whoami: {|
    +isDebugAssertionsEnabled: boolean
  |}
|};
export type NavigationHeaderQuery = {|
  variables: NavigationHeaderQueryVariables,
  response: NavigationHeaderQueryResponse,
|};

/*
query NavigationHeaderQuery {
  whoami {
    isDebugAssertionsEnabled
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isDebugAssertionsEnabled",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "NavigationHeaderQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "WhoamiPayload",
        "kind": "LinkedField",
        "name": "whoami",
        "plural": false,
        "selections": [
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "NavigationHeaderQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "WhoamiPayload",
        "kind": "LinkedField",
        "name": "whoami",
        "plural": false,
        "selections": [
          (v0/*: any*/),
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
    ]
  },
  "params": {
    "cacheID": "503f9167e695c2ecc8f1551fac08265d",
    "id": null,
    "metadata": {},
    "name": "NavigationHeaderQuery",
    "operationKind": "query",
    "text": "query NavigationHeaderQuery {\n  whoami {\n    isDebugAssertionsEnabled\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '22a3d238878cf82d90908db5cb68f947';
export default node;
