/**
 * @generated SignedSource<<f7070afeb798d304613748e85e7bbee1>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./x relay
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
import type { DailyIncomeMeterFragment$fragmentType } from "./DailyIncomeMeterFragment.graphql";
export type AnalyticsDailyReportsQuery$variables = {||};
export type AnalyticsDailyReportsQuery$data = {|
  +analytics: {|
    +dailyReports: $ReadOnlyArray<{|
      +dateDay: string,
      +productsSummary: $ReadOnlyArray<{|
        +productName: string,
        +totalUnits: number,
      |}>,
      +$fragmentSpreads: DailyIncomeMeterFragment$fragmentType,
    |}>,
  |},
|};
export type AnalyticsDailyReportsQuery = {|
  response: AnalyticsDailyReportsQuery$data,
  variables: AnalyticsDailyReportsQuery$variables,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "dateDay",
  "storageKey": null
},
v1 = {
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
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AnalyticsDailyReportsQuery",
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
            "concreteType": "AnalyticsDailyReportInfo",
            "kind": "LinkedField",
            "name": "dailyReports",
            "plural": true,
            "selections": [
              (v0/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "DailyIncomeMeterFragment"
              },
              (v1/*: any*/)
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
    "name": "AnalyticsDailyReportsQuery",
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
            "concreteType": "AnalyticsDailyReportInfo",
            "kind": "LinkedField",
            "name": "dailyReports",
            "plural": true,
            "selections": [
              (v0/*: any*/),
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
              (v1/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "0b1b972a9363f6bbcbb92f7d979f1005",
    "id": null,
    "metadata": {},
    "name": "AnalyticsDailyReportsQuery",
    "operationKind": "query",
    "text": "query AnalyticsDailyReportsQuery{analytics{dailyReports{dateDay,...DailyIncomeMeterFragment,productsSummary{productName,totalUnits}}}}fragment DailyIncomeMeterFragment on AnalyticsDailyReportInfo{total{unitAmount,unitAmountCurrency}}"
  }
};
})();

if (__DEV__) {
  (node/*: any*/).hash = "56f00366df78d5b29efd2d50bb916d80";
}

module.exports = ((node/*: any*/)/*: Query<
  AnalyticsDailyReportsQuery$variables,
  AnalyticsDailyReportsQuery$data,
>*/);
