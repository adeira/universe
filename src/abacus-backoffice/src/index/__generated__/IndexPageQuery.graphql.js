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
    |}>,
    +leastSoldProducts: $ReadOnlyArray<{|
      +productId: string,
      +productName: string,
      +productUnits: number,
    |}>,
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
    leastSoldProducts {
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
v1 = [
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
        "selections": (v0/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "AnalyticsSoldProductInfo",
        "kind": "LinkedField",
        "name": "leastSoldProducts",
        "plural": true,
        "selections": (v0/*: any*/),
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
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "IndexPageQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "1c40ec38e9f48f376c072e209f98a536",
    "id": null,
    "metadata": {},
    "name": "IndexPageQuery",
    "operationKind": "query",
    "text": "query IndexPageQuery {\n  analytics {\n    mostSoldProducts {\n      productId\n      productName\n      productUnits\n    }\n    leastSoldProducts {\n      productId\n      productName\n      productUnits\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'c57ee2b632cf43379954e22329a408ff';
export default node;
