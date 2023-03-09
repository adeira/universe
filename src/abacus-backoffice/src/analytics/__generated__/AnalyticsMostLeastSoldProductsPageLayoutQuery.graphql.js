/**
 * @generated SignedSource<<6bdcf740a84dddbf25696ef2e6336f38>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./x relay
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type TimeFrame = "ISO_WEEK" | "MONTH" | "QUARTER" | "YEAR" | "%future added value";
export type AnalyticsMostLeastSoldProductsPageLayoutQuery$variables = {|
  showMostToLeast: boolean,
  timeFrame: TimeFrame,
|};
export type AnalyticsMostLeastSoldProductsPageLayoutQuery$data = {|
  +analytics: {|
    +leastSoldProducts?: $ReadOnlyArray<{|
      +dateYear: number,
      +stats: $ReadOnlyArray<{|
        +productName: string,
        +productUnits: number,
      |}>,
      +timeFrame: number,
    |}>,
    +mostSoldProducts?: $ReadOnlyArray<{|
      +dateYear: number,
      +stats: $ReadOnlyArray<{|
        +productName: string,
        +productUnits: number,
      |}>,
      +timeFrame: number,
    |}>,
  |},
|};
export type AnalyticsMostLeastSoldProductsPageLayoutQuery = {|
  response: AnalyticsMostLeastSoldProductsPageLayoutQuery$data,
  variables: AnalyticsMostLeastSoldProductsPageLayoutQuery$variables,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "showMostToLeast"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "timeFrame"
},
v2 = [
  {
    "kind": "Variable",
    "name": "timeFrame",
    "variableName": "timeFrame"
  }
],
v3 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "timeFrame",
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
v4 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "AnalyticsQuery",
    "kind": "LinkedField",
    "name": "analytics",
    "plural": false,
    "selections": [
      {
        "condition": "showMostToLeast",
        "kind": "Condition",
        "passingValue": true,
        "selections": [
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "AnalyticsSoldProductTimeFrameInfo",
            "kind": "LinkedField",
            "name": "mostSoldProducts",
            "plural": true,
            "selections": (v3/*: any*/),
            "storageKey": null
          }
        ]
      },
      {
        "condition": "showMostToLeast",
        "kind": "Condition",
        "passingValue": false,
        "selections": [
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "AnalyticsSoldProductTimeFrameInfo",
            "kind": "LinkedField",
            "name": "leastSoldProducts",
            "plural": true,
            "selections": (v3/*: any*/),
            "storageKey": null
          }
        ]
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "AnalyticsMostLeastSoldProductsPageLayoutQuery",
    "selections": (v4/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "AnalyticsMostLeastSoldProductsPageLayoutQuery",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "36b97c772a33f133bbfa9d803ce60cdf",
    "id": null,
    "metadata": {},
    "name": "AnalyticsMostLeastSoldProductsPageLayoutQuery",
    "operationKind": "query",
    "text": "query AnalyticsMostLeastSoldProductsPageLayoutQuery($timeFrame:TimeFrame!,$showMostToLeast:Boolean!){analytics{mostSoldProducts(timeFrame:$timeFrame)@include(if:$showMostToLeast){timeFrame,dateYear,stats{productName,productUnits}},leastSoldProducts(timeFrame:$timeFrame)@skip(if:$showMostToLeast){timeFrame,dateYear,stats{productName,productUnits}}}}"
  }
};
})();

if (__DEV__) {
  (node/*: any*/).hash = "4055e3cfed6323d7ba54f535c7af3425";
}

module.exports = ((node/*: any*/)/*: Query<
  AnalyticsMostLeastSoldProductsPageLayoutQuery$variables,
  AnalyticsMostLeastSoldProductsPageLayoutQuery$data,
>*/);
