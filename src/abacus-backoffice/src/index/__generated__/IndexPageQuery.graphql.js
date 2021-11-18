/**
 * @flow
 */

/* eslint-disable */

import type { ConcreteRequest } from 'relay-runtime';
export type IndexPageQueryVariables = {||};
export type IndexPageQueryResponse = {|
  +analytics: {|
    +mostSoldProducts: $ReadOnlyArray<{|
      +productId: string,
      +productName: string,
      +productUnits: number,
    |}>
  |}
|};
export type IndexPageQuery = {|
  variables: IndexPageQueryVariables,
  response: IndexPageQueryResponse,
|};

/*
query IndexPageQuery {
  analytics {
    mostSoldProducts {
      productId
      productName
      productUnits
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
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
        "concreteType": "AnalyticsSoldProductInfo",
        "kind": "LinkedField",
        "name": "mostSoldProducts",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "productId",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "productName",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "productUnits",
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "IndexPageQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "IndexPageQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "8c1d6b611b3a12f9dd3cca3340ac3557",
    "id": null,
    "metadata": {},
    "name": "IndexPageQuery",
    "operationKind": "query",
    "text": "query IndexPageQuery {\n  analytics {\n    mostSoldProducts {\n      productId\n      productName\n      productUnits\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '62685befd60eb01c41d82987582f83ba';
export default node;
