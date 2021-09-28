/**
 * @flow
 */

/* eslint-disable */

import type { ConcreteRequest } from 'relay-runtime';
export type AnalyticsRedirectsPageQueryVariables = {||};
export type AnalyticsRedirectsPageQueryResponse = {|
  +analytics: {|
    +redirectHits: $ReadOnlyArray<{|
      +uuid: string,
      +redirectsTo: string,
      +description: string,
      +hits: number,
    |}>
  |}
|};
export type AnalyticsRedirectsPageQuery = {|
  variables: AnalyticsRedirectsPageQueryVariables,
  response: AnalyticsRedirectsPageQueryResponse,
|};

/*
query AnalyticsRedirectsPageQuery {
  analytics {
    redirectHits {
      uuid
      redirectsTo
      description
      hits
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
    "cacheID": "136a67b8ea638bb0bc421b4e6ef68090",
    "id": null,
    "metadata": {},
    "name": "AnalyticsRedirectsPageQuery",
    "operationKind": "query",
    "text": "query AnalyticsRedirectsPageQuery {\n  analytics {\n    redirectHits {\n      uuid\n      redirectsTo\n      description\n      hits\n      id\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '02c3442388de1c33274df8bb7f529620';
export default node;
