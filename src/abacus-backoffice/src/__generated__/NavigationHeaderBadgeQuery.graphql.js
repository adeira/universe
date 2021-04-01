/**
 * @generated SignedSource<<8a4a3493836efddd442e6deb5faae15e>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./node_modules/.bin/relay-compiler
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type NavigationHeaderBadgeQuery$variables = {||};
export type NavigationHeaderBadgeQueryVariables = NavigationHeaderBadgeQuery$variables;
export type NavigationHeaderBadgeQuery$data = {|
  +auth: {|
    +whoami: {|
      +isDebugAssertionsEnabled: boolean,
    |},
  |},
|};
export type NavigationHeaderBadgeQueryResponse = NavigationHeaderBadgeQuery$data;
export type NavigationHeaderBadgeQuery = {|
  variables: NavigationHeaderBadgeQueryVariables,
  response: NavigationHeaderBadgeQuery$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
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
    "name": "NavigationHeaderBadgeQuery",
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
    "name": "NavigationHeaderBadgeQuery",
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
    "cacheID": "e01b03a5ac8cb9be812e005ae59dc3db",
    "id": null,
    "metadata": {},
    "name": "NavigationHeaderBadgeQuery",
    "operationKind": "query",
    "text": "query NavigationHeaderBadgeQuery {\n  auth {\n    whoami {\n      isDebugAssertionsEnabled\n      id\n    }\n  }\n}\n"
  }
};
})();

if (__DEV__) {
  (node/*: any*/).hash = "3ac156cd43017b5b34dcd0300a4e4a67";
}

module.exports = ((node/*: any*/)/*: Query<
  NavigationHeaderBadgeQuery$variables,
  NavigationHeaderBadgeQuery$data,
>*/);
