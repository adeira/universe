/**
 * @generated SignedSource<<111e35e24b95fb65392f684e2297abb2>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./x relay
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type PageVisitInputLocation = {|
  hash?: ?string,
  hostname?: ?string,
  pathname?: ?string,
  port?: ?string,
  protocol?: ?string,
  search?: ?string,
|};
export type PageVisitInputScreen = {|
  height?: ?string,
  orientationAngle?: ?string,
  orientationType?: ?string,
  width?: ?string,
|};
export type recordPageVisitAnalyticsMutation$variables = {|
  location: PageVisitInputLocation,
  screen: PageVisitInputScreen,
  userAgent?: ?string,
|};
export type recordPageVisitAnalyticsMutation$data = {|
  +analytics: {|
    +recordPageVisit: {|
      +success: boolean,
    |},
  |},
|};
export type recordPageVisitAnalyticsMutation = {|
  response: recordPageVisitAnalyticsMutation$data,
  variables: recordPageVisitAnalyticsMutation$variables,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "location"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "screen"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "userAgent"
},
v3 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "AnalyticsMutation",
    "kind": "LinkedField",
    "name": "analytics",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "fields": [
              {
                "kind": "Variable",
                "name": "location",
                "variableName": "location"
              },
              {
                "kind": "Variable",
                "name": "screen",
                "variableName": "screen"
              },
              {
                "kind": "Variable",
                "name": "userAgent",
                "variableName": "userAgent"
              }
            ],
            "kind": "ObjectValue",
            "name": "input"
          }
        ],
        "concreteType": "PageVisit",
        "kind": "LinkedField",
        "name": "recordPageVisit",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "success",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "recordPageVisitAnalyticsMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "recordPageVisitAnalyticsMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "ead35dd59a5243bacdef5e5b27ee9a5e",
    "id": null,
    "metadata": {},
    "name": "recordPageVisitAnalyticsMutation",
    "operationKind": "mutation",
    "text": "mutation recordPageVisitAnalyticsMutation(\n  $userAgent: String\n  $location: PageVisitInputLocation!\n  $screen: PageVisitInputScreen!\n) {\n  analytics {\n    recordPageVisit(input: {userAgent: $userAgent, location: $location, screen: $screen}) {\n      success\n    }\n  }\n}\n"
  }
};
})();

if (__DEV__) {
  (node/*: any*/).hash = "f1d640fd34e611be6aed208a4c6ce626";
}

module.exports = ((node/*: any*/)/*: Mutation<
  recordPageVisitAnalyticsMutation$variables,
  recordPageVisitAnalyticsMutation$data,
>*/);
