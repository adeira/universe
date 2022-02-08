/**
 * @generated SignedSource<<a14997d4f26a81e5167d4bd757964b99>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./node_modules/.bin/relay-compiler
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type recordPageVisitAnalyticsMutation$variables = {|
  userAgent?: ?string,
  locationHref?: ?string,
|};
export type recordPageVisitAnalyticsMutation$data = {|
  +analytics: {|
    +recordPageVisit: {|
      +success: boolean,
    |},
  |},
|};
export type recordPageVisitAnalyticsMutation = {|
  variables: recordPageVisitAnalyticsMutation$variables,
  response: recordPageVisitAnalyticsMutation$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "locationHref"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "userAgent"
},
v2 = [
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
                "name": "locationHref",
                "variableName": "locationHref"
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
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "recordPageVisitAnalyticsMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "recordPageVisitAnalyticsMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "4250c3cb5a2a576cdd9a8a2ea09d94a4",
    "id": null,
    "metadata": {},
    "name": "recordPageVisitAnalyticsMutation",
    "operationKind": "mutation",
    "text": "mutation recordPageVisitAnalyticsMutation(\n  $userAgent: String\n  $locationHref: String\n) {\n  analytics {\n    recordPageVisit(input: {userAgent: $userAgent, locationHref: $locationHref}) {\n      success\n    }\n  }\n}\n"
  }
};
})();

if (__DEV__) {
  (node/*: any*/).hash = "42af926f9a52a6aba6f203b13b03dfb5";
}

module.exports = ((node/*: any*/)/*: Mutation<
  recordPageVisitAnalyticsMutation$variables,
  recordPageVisitAnalyticsMutation$data,
>*/);
