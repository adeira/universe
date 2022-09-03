/**
 * @generated SignedSource<<81d2961ba0e31e266f9c1989a99556fc>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./x relay
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
type DailyIncomeMeterFragment$fragmentType = any;
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
    "cacheID": "b1125e547b911af69ba5f9242d84347c",
    "id": null,
    "metadata": {},
    "name": "AnalyticsDailyReportsQuery",
    "operationKind": "query",
    "text": "query AnalyticsDailyReportsQuery {\n  analytics {\n    dailyReports {\n      dateDay\n      ...DailyIncomeMeterFragment\n      productsSummary {\n        productName\n        totalUnits\n      }\n    }\n  }\n}\n\nfragment DailyIncomeMeterFragment on AnalyticsDailyReportInfo {\n  total {\n    unitAmount\n    unitAmountCurrency\n  }\n}\n"
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
