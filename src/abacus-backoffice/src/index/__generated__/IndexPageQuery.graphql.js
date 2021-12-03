/**
 * @flow
 */

/* eslint-disable */

import type { ConcreteRequest } from 'relay-runtime';
export type SupportedCurrency = "MXN" | "%future added value";
export type IndexPageQueryVariables = {||};
export type IndexPageQueryResponse = {|
  +analytics: {|
    +mostSoldProducts: $ReadOnlyArray<{|
      +productId: string,
      +productName: string,
      +productUnits: number,
    |}>,
    +dailyReports: $ReadOnlyArray<{|
      +dateDay: string,
      +total: {|
        +unitAmount: number,
        +unitAmountCurrency: SupportedCurrency,
      |},
      +productsSummary: $ReadOnlyArray<{|
        +productId: string,
        +productName: string,
        +totalUnits: number,
      |}>,
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
    dailyReports {
      dateDay
      total {
        unitAmount
        unitAmountCurrency
      }
      productsSummary {
        productId
        productName
        totalUnits
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "productId",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "productName",
  "storageKey": null
},
v2 = [
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
          (v0/*: any*/),
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "productUnits",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "AnalyticsDailyReportInfo",
        "kind": "LinkedField",
        "name": "dailyReports",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "dateDay",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Price",
            "kind": "LinkedField",
            "name": "total",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "unitAmount",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "unitAmountCurrency",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AnalyticsDailyReportProductSummaryInfo",
            "kind": "LinkedField",
            "name": "productsSummary",
            "plural": true,
            "selections": [
              (v0/*: any*/),
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "totalUnits",
                "storageKey": null
              }
            ],
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
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "IndexPageQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "6f6b4f8c5708612444eb13d90f745aaa",
    "id": null,
    "metadata": {},
    "name": "IndexPageQuery",
    "operationKind": "query",
    "text": "query IndexPageQuery {\n  analytics {\n    mostSoldProducts {\n      productId\n      productName\n      productUnits\n    }\n    dailyReports {\n      dateDay\n      total {\n        unitAmount\n        unitAmountCurrency\n      }\n      productsSummary {\n        productId\n        productName\n        totalUnits\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '33ecaf3fca35473879c047b3e66c386d';
export default node;
