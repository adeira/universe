/**
 * @flow
 */

/* eslint-disable */

import type { ConcreteRequest } from 'relay-runtime';
export type SupportedCurrency = "MXN" | "%future added value";
export type ProductsCardsQueryVariables = {||};
export type ProductsCardsQueryResponse = {|
  +commerce: {|
    +products: ?$ReadOnlyArray<?{|
      +id: string,
      +key: string,
      +name: string,
      +imageCover: ?{|
        +blurhash: string
      |},
      +price: {|
        +unitAmount: number,
        +unitAmountCurrency: SupportedCurrency,
      |},
    |}>
  |}
|};
export type ProductsCardsQuery = {|
  variables: ProductsCardsQueryVariables,
  response: ProductsCardsQueryResponse,
|};

/*
query ProductsCardsQuery {
  commerce {
    products: searchAllProducts(clientLocale: en_US, priceSortDirection: LOW_TO_HIGH) {
      id
      key
      name
      imageCover {
        blurhash
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
var v0 = [
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
            "kind": "Literal",
            "name": "clientLocale",
            "value": "en_US"
          },
          {
            "kind": "Literal",
            "name": "priceSortDirection",
            "value": "LOW_TO_HIGH"
          }
        ],
        "concreteType": "Product",
        "kind": "LinkedField",
        "name": "searchAllProducts",
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
              }
            ],
            "storageKey": null
          },
          {
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
          }
        ],
        "storageKey": "searchAllProducts(clientLocale:\"en_US\",priceSortDirection:\"LOW_TO_HIGH\")"
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
    "name": "ProductsCardsQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ProductsCardsQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "3c714de9fe9bafd3c9fbe90b82cd594b",
    "id": null,
    "metadata": {},
    "name": "ProductsCardsQuery",
    "operationKind": "query",
    "text": "query ProductsCardsQuery {\n  commerce {\n    products: searchAllProducts(clientLocale: en_US, priceSortDirection: LOW_TO_HIGH) {\n      id\n      key\n      name\n      imageCover {\n        blurhash\n      }\n      price {\n        unitAmount\n        unitAmountCurrency\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'b20ec43141756b8ee22172a015207248';
export default node;
