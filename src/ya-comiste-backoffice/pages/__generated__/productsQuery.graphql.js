/**
 * @flow
 */

/* eslint-disable */

import type { ConcreteRequest } from 'relay-runtime';
export type SupportedCurrency = "MXN" | "%future added value";
export type productsQueryVariables = {||};
export type productsQueryResponse = {|
  +searchProducts: ?$ReadOnlyArray<?{|
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
  searchProducts(clientLocale: en_US, priceSortDirection: LOW_TO_HIGH) {
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
    "name": "searchProducts",
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
    "storageKey": "searchProducts(clientLocale:\"en_US\",priceSortDirection:\"LOW_TO_HIGH\")"
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
    "cacheID": "cfdfa5cceafda987681d705c94acb227",
    "id": null,
    "metadata": {},
    "name": "productsQuery",
    "operationKind": "query",
    "text": "query productsQuery {\n  searchProducts(clientLocale: en_US, priceSortDirection: LOW_TO_HIGH) {\n    id\n    name\n    description\n    images\n    unitLabel\n    price {\n      unitAmount\n      unitAmountCurrency\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'c9ab1bd1b8f7965306a4b4ab6e04201c';
export default node;
