/**
 * @generated SignedSource<<48581098e1dcb38d26692806d52e78b2>>
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
    "cacheID": "aab0a15d09392709d04342d7faf282e5",
    "id": null,
    "metadata": {},
    "name": "IndexPageQuery",
    "operationKind": "query",
    "text": "query IndexPageQuery {\n  analytics {\n    dailyReports {\n      dateDay\n      total {\n        unitAmount\n        unitAmountCurrency\n      }\n      productsSummary {\n        productName\n        totalUnits\n      }\n    }\n  }\n}\n"
  }
};
})();

if (__DEV__) {
  (node/*: any*/).hash = "0048fbefa282cc1af3e645b53be9403c";
}

module.exports = ((node/*: any*/)/*: Query<
  IndexPageQuery$variables,
  IndexPageQuery$data,
>*/);
