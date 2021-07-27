/**
 * @flow
 */

/* eslint-disable */

import type { ConcreteRequest } from 'relay-runtime';
export type PriceSortDirection = "HIGH_TO_LOW" | "LOW_TO_HIGH" | "%future added value";
export type SupportedCurrency = "MXN" | "%future added value";
export type SupportedLocale = "en_US" | "es_MX" | "%future added value";
export type ProductsGridPosQueryVariables = {|
  clientLocale: SupportedLocale,
  priceSortDirection: PriceSortDirection,
  categories?: ?$ReadOnlyArray<string>,
|};
export type ProductsGridPosQueryResponse = {|
  +commerce: {|
    +products: $ReadOnlyArray<?{|
      +id: string,
      +key: string,
      +name: string,
      +imageCover: ?{|
        +blurhash: string,
        +url: string,
      |},
      +price: {|
        +unitAmount: number,
        +unitAmountCurrency: SupportedCurrency,
      |},
    |}>
  |}
|};
export type ProductsGridPosQuery = {|
  variables: ProductsGridPosQueryVariables,
  response: ProductsGridPosQueryResponse,
|};

/*
query ProductsGridPosQuery(
  $clientLocale: SupportedLocale!
  $priceSortDirection: PriceSortDirection!
  $categories: [ID!]
) {
  commerce {
    products: searchAllPublishedProducts(clientLocale: $clientLocale, priceSortDirection: $priceSortDirection, categories: $categories, visibility: POS) {
      id
      key
      name
      imageCover {
        blurhash
        url
      }
      price {
        unitAmount
        unitAmountCurrency
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "categories"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "clientLocale"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "priceSortDirection"
},
v3 = [
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
        "args": [
          {
            "kind": "Variable",
            "name": "categories",
            "variableName": "categories"
          },
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
            "kind": "Literal",
            "name": "visibility",
            "value": "POS"
          }
        ],
        "concreteType": "Product",
        "kind": "LinkedField",
        "name": "searchAllPublishedProducts",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "key",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "imageCover",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "blurhash",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "url",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Price",
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ProductsGridPosQuery",
    "selections": (v3/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v2/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "ProductsGridPosQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "6d84e55beb81b0ccf7de051f81631049",
    "id": null,
    "metadata": {},
    "name": "ProductsGridPosQuery",
    "operationKind": "query",
    "text": "query ProductsGridPosQuery(\n  $clientLocale: SupportedLocale!\n  $priceSortDirection: PriceSortDirection!\n  $categories: [ID!]\n) {\n  commerce {\n    products: searchAllPublishedProducts(clientLocale: $clientLocale, priceSortDirection: $priceSortDirection, categories: $categories, visibility: POS) {\n      id\n      key\n      name\n      imageCover {\n        blurhash\n        url\n      }\n      price {\n        unitAmount\n        unitAmountCurrency\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '8706603b11361b030f560636b898ace0';
export default node;
