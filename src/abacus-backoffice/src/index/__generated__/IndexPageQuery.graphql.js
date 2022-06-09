/**
 * @generated SignedSource<<7d8c8233293f9b262d76640f15c3a87d>>
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
export type IndexPageQuery$variables = {||};
export type IndexPageQuery$data = {|
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
export type IndexPageQuery = {|
  response: IndexPageQuery$data,
  variables: IndexPageQuery$variables,
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
    "name": "IndexPageQuery",
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
    "name": "IndexPageQuery",
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
    "cacheID": "91e3332c6fb51370add27a31d4f6ca11",
    "id": null,
    "metadata": {},
    "name": "IndexPageQuery",
    "operationKind": "query",
    "text": "query IndexPageQuery {\n  analytics {\n    dailyReports {\n      dateDay\n      ...DailyIncomeMeterFragment\n      productsSummary {\n        productName\n        totalUnits\n      }\n    }\n  }\n}\n\nfragment DailyIncomeMeterFragment on AnalyticsDailyReportInfo {\n  total {\n    unitAmount\n    unitAmountCurrency\n  }\n}\n"
  }
};
})();

if (__DEV__) {
  (node/*: any*/).hash = "f0747d4b4fbdf60de454e4e3889ba467";
}

module.exports = ((node/*: any*/)/*: Query<
  IndexPageQuery$variables,
  IndexPageQuery$data,
>*/);
