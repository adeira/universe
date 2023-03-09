/**
 * @generated SignedSource<<3510ed615ae0185fdffbefe0452435dd>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./x relay
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type NavigationHeaderBadgeQuery$variables = {||};
export type NavigationHeaderBadgeQuery$data = {|
  +auth: {|
    +whoami: {|
      +isDebugAssertionsEnabled: boolean,
    |},
  |},
|};
export type NavigationHeaderBadgeQuery = {|
  response: NavigationHeaderBadgeQuery$data,
  variables: NavigationHeaderBadgeQuery$variables,
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
    "cacheID": "7c9935c537a1fa18d5fab5f7db896cef",
    "id": null,
    "metadata": {},
    "name": "NavigationHeaderBadgeQuery",
    "operationKind": "query",
    "text": "query NavigationHeaderBadgeQuery{auth{whoami{isDebugAssertionsEnabled,id}}}"
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
