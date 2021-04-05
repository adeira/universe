/**
 * @flow
 */

/* eslint-disable */

import type { ConcreteRequest } from 'relay-runtime';
export type PriceSortDirection = "HIGH_TO_LOW" | "LOW_TO_HIGH" | "%future added value";
export type SupportedCurrency = "MXN" | "%future added value";
export type SupportedLocale = "en_US" | "es_MX" | "%future added value";
export type ShopLayoutContentQueryVariables = {|
  clientLocale: SupportedLocale,
  priceSortDirection: PriceSortDirection,
  searchTerm?: ?string,
|};
export type ShopLayoutContentQueryResponse = {|
  +commerce: {|
    +products: ?$ReadOnlyArray<?{|
      +key: string,
      +name: string,
      +price: {|
        +unitAmount: number,
        +unitAmountCurrency: SupportedCurrency,
      |},
    |}>
  |}
|};
export type ShopLayoutContentQuery = {|
  variables: ShopLayoutContentQueryVariables,
  response: ShopLayoutContentQueryResponse,
|};

/*
query ShopLayoutContentQuery(
  $clientLocale: SupportedLocale!
  $priceSortDirection: PriceSortDirection!
  $searchTerm: String
) {
  commerce {
    products: searchPublishedProducts(clientLocale: $clientLocale, priceSortDirection: $priceSortDirection, searchTerm: $searchTerm) {
      key
      name
      price {
        unitAmount
        unitAmountCurrency
      }
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "clientLocale"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "priceSortDirection"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "searchTerm"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "clientLocale",
    "variableName": "clientLocale"
  },
  {
    "kind": "Variable",
    "name": "priceSortDirection",
    "variableName": "priceSortDirection"
  },
  {
    "kind": "Variable",
    "name": "searchTerm",
    "variableName": "searchTerm"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "key",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "ProductPrice",
  "kind": "LinkedField",
  "name": "price",
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ShopLayoutContentQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CommerceQuery",
        "kind": "LinkedField",
        "name": "commerce",
        "plural": false,
        "selections": [
          {
            "alias": "products",
            "args": (v1/*: any*/),
            "concreteType": "Product",
            "kind": "LinkedField",
            "name": "searchPublishedProducts",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/)
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ShopLayoutContentQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CommerceQuery",
        "kind": "LinkedField",
        "name": "commerce",
        "plural": false,
        "selections": [
          {
            "alias": "products",
            "args": (v1/*: any*/),
            "concreteType": "Product",
            "kind": "LinkedField",
            "name": "searchPublishedProducts",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "436459918e4769a2a38858408ce9e5ab",
    "id": null,
    "metadata": {},
    "name": "ShopLayoutContentQuery",
    "operationKind": "query",
    "text": "query ShopLayoutContentQuery(\n  $clientLocale: SupportedLocale!\n  $priceSortDirection: PriceSortDirection!\n  $searchTerm: String\n) {\n  commerce {\n    products: searchPublishedProducts(clientLocale: $clientLocale, priceSortDirection: $priceSortDirection, searchTerm: $searchTerm) {\n      key\n      name\n      price {\n        unitAmount\n        unitAmountCurrency\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'ca5dd8074762cd481eb86fbf69c195c1';
export default node;
