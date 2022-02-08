/**
 * @generated SignedSource<<3077057f6130864b2d6d505cdbc4fa62>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./node_modules/.bin/relay-compiler
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type SupportedCurrency = "MXN" | "%future added value";
export type IndexPageQuery$variables = {||};
export type IndexPageQuery$data = {|
  +analytics: {|
    +mostSoldProducts: $ReadOnlyArray<{|
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
        +productName: string,
        +totalUnits: number,
      |}>,
    |}>,
  |},
|};
export type IndexPageQuery = {|
  variables: IndexPageQuery$variables,
  response: IndexPageQuery$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "productName",
  "storageKey": null
},
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
        "selections": [
          (v0/*: any*/),
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
    "cacheID": "d0c1422b3a90132cbcbe5781905be80e",
    "id": null,
    "metadata": {},
    "name": "IndexPageQuery",
    "operationKind": "query",
    "text": "query IndexPageQuery {\n  analytics {\n    mostSoldProducts {\n      productName\n      productUnits\n    }\n    dailyReports {\n      dateDay\n      total {\n        unitAmount\n        unitAmountCurrency\n      }\n      productsSummary {\n        productName\n        totalUnits\n      }\n    }\n  }\n}\n"
  }
};
})();

if (__DEV__) {
  (node/*: any*/).hash = "6aa30f95e3533d8110a8f321ec5104a7";
}

module.exports = ((node/*: any*/)/*: Query<
  IndexPageQuery$variables,
  IndexPageQuery$data,
>*/);
