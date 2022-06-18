/**
 * @generated SignedSource<<3eb5134a1dbdcf4b36658dd71067fcf6>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./x relay
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type AnalyticsMostSoldProductsPageLayoutQuery$variables = {||};
export type AnalyticsMostSoldProductsPageLayoutQuery$data = {|
  +analytics: {|
    +mostSoldProductsQuarterly: $ReadOnlyArray<{|
      +dateQuarter: number,
      +dateYear: number,
      +stats: $ReadOnlyArray<{|
        +productName: string,
        +productUnits: number,
      |}>,
    |}>,
  |},
|};
export type AnalyticsMostSoldProductsPageLayoutQuery = {|
  response: AnalyticsMostSoldProductsPageLayoutQuery$data,
  variables: AnalyticsMostSoldProductsPageLayoutQuery$variables,
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
        "concreteType": "AnalyticsSoldProductQuarterlyInfo",
        "kind": "LinkedField",
        "name": "mostSoldProductsQuarterly",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "dateQuarter",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "dateYear",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AnalyticsSoldProductInfo",
            "kind": "LinkedField",
            "name": "stats",
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
                "name": "productUnits",
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
    "name": "AnalyticsMostSoldProductsPageLayoutQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AnalyticsMostSoldProductsPageLayoutQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "a0bba729ce68502cb0942b13bb8c6e1a",
    "id": null,
    "metadata": {},
    "name": "AnalyticsMostSoldProductsPageLayoutQuery",
    "operationKind": "query",
    "text": "query AnalyticsMostSoldProductsPageLayoutQuery {\n  analytics {\n    mostSoldProductsQuarterly {\n      dateQuarter\n      dateYear\n      stats {\n        productName\n        productUnits\n      }\n    }\n  }\n}\n"
  }
};
})();

if (__DEV__) {
  (node/*: any*/).hash = "dec960622c8d7f5a738e9aa51d34f683";
}

module.exports = ((node/*: any*/)/*: Query<
  AnalyticsMostSoldProductsPageLayoutQuery$variables,
  AnalyticsMostSoldProductsPageLayoutQuery$data,
>*/);
