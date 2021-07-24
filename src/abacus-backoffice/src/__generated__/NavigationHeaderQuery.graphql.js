/**
 * @flow
 */

/* eslint-disable */

import type { ConcreteRequest } from 'relay-runtime';
export type NavigationHeaderQueryVariables = {||};
export type NavigationHeaderQueryResponse = {|
  +auth: {|
    +whoami: {|
      +isDebugAssertionsEnabled: boolean
    |}
  |}
|};
export type NavigationHeaderQuery = {|
  variables: NavigationHeaderQueryVariables,
  response: NavigationHeaderQueryResponse,
|};

/*
query NavigationHeaderQuery {
  auth {
    whoami {
      isDebugAssertionsEnabled
      id
    }
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
        "concreteType": "AuthQuery",
        "kind": "LinkedField",
        "name": "auth",
        "plural": false,
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
        "concreteType": "AuthQuery",
        "kind": "LinkedField",
        "name": "auth",
        "plural": false,
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
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "344b1cb20325560e12a119c5913de8b0",
    "id": null,
    "metadata": {},
    "name": "NavigationHeaderQuery",
    "operationKind": "query",
    "text": "query NavigationHeaderQuery {\n  auth {\n    whoami {\n      isDebugAssertionsEnabled\n      id\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '095528fcceaa1f54d7dc1ed1a51fccaa';
export default node;
