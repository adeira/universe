/**
 * @flow
 */

/* eslint-disable */

import type { ConcreteRequest } from 'relay-runtime';
export type SupportedCurrency = "MXN" | "%future added value";
export type productsQueryVariables = {||};
export type productsQueryResponse = {|
  +searchAllProducts: ?$ReadOnlyArray<?{|
    +id: string,
    +name: ?string,
    +description: ?string,
    +images: $ReadOnlyArray<string>,
    +unitLabel: string,
    +price: {|
      +unitAmount: number,
      +unitAmountCurrency: SupportedCurrency,
    |},
  |}>
|};
export type productsQuery = {|
  variables: productsQueryVariables,
  response: productsQueryResponse,
|};

/*
query productsQuery {
  searchAllProducts(clientLocale: en_US, priceSortDirection: LOW_TO_HIGH) {
    id
    name
    description
    images
    unitLabel
    price {
      unitAmount
      unitAmountCurrency
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
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
        "name": "name",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "description",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "images",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "unitLabel",
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
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "productsQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "productsQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "bec5c0b3ca8e82017bcc9d2b631f1952",
    "id": null,
    "metadata": {},
    "name": "productsQuery",
    "operationKind": "query",
    "text": "query productsQuery {\n  searchAllProducts(clientLocale: en_US, priceSortDirection: LOW_TO_HIGH) {\n    id\n    name\n    description\n    images\n    unitLabel\n    price {\n      unitAmount\n      unitAmountCurrency\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '5de0dedf8ef0fb83777a80d4db6366ed';
export default node;
