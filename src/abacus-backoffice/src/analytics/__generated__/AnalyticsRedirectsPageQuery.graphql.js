/**
 * @generated SignedSource<<278a22af6d35f52f777bc372a5a383bc>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./x relay
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type AnalyticsRedirectsPageQuery$variables = {||};
export type AnalyticsRedirectsPageQuery$data = {|
  +analytics: {|
    +redirectHits: $ReadOnlyArray<{|
      +description: string,
      +hits: number,
      +redirectsTo: string,
      +uuid: string,
    |}>,
  |},
|};
export type AnalyticsRedirectsPageQuery = {|
  response: AnalyticsRedirectsPageQuery$data,
  variables: AnalyticsRedirectsPageQuery$variables,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "uuid",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "redirectsTo",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "hits",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AnalyticsRedirectsPageQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "AnalyticsQuery",
        "kind": "LinkedField",
        "name": "analytics",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Redirect",
            "kind": "LinkedField",
            "name": "redirectHits",
            "plural": true,
            "selections": [
              (v0/*: any*/),
              (v1/*: any*/),
              (v2/*: any*/),
              (v3/*: any*/)
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
    "name": "AnalyticsRedirectsPageQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "AnalyticsQuery",
        "kind": "LinkedField",
        "name": "analytics",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Redirect",
            "kind": "LinkedField",
            "name": "redirectHits",
            "plural": true,
            "selections": [
              (v0/*: any*/),
              (v1/*: any*/),
              (v2/*: any*/),
              (v3/*: any*/),
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
    "cacheID": "f7cbda4da6edd2d2635eeb32f8888624",
    "id": null,
    "metadata": {},
    "name": "AnalyticsRedirectsPageQuery",
    "operationKind": "query",
    "text": "query AnalyticsRedirectsPageQuery{analytics{redirectHits{uuid,redirectsTo,description,hits,id}}}"
  }
};
})();

if (__DEV__) {
  (node/*: any*/).hash = "02c3442388de1c33274df8bb7f529620";
}

module.exports = ((node/*: any*/)/*: Query<
  AnalyticsRedirectsPageQuery$variables,
  AnalyticsRedirectsPageQuery$data,
>*/);
