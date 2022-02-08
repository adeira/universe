/**
 * @generated SignedSource<<7262a4c117de9c8a426dd24173a7a55e>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./node_modules/.bin/relay-compiler
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type PriceSortDirection = "LOW_TO_HIGH" | "HIGH_TO_LOW" | "%future added value";
export type SupportedCurrency = "MXN" | "%future added value";
export type SupportedLocale = "en_US" | "es_MX" | "%future added value";
export type ShopLayoutContentQuery$variables = {|
  clientLocale: SupportedLocale,
  priceSortDirection: PriceSortDirection,
|};
export type ShopLayoutContentQuery$data = {|
  +commerce: {|
    +products: $ReadOnlyArray<?{|
      +key: string,
      +name: string,
      +price: {|
        +unitAmount: number,
        +unitAmountCurrency: SupportedCurrency,
      |},
      +imageCover: ?{|
        +blurhash: string,
        +url: string,
      |},
    |}>,
  |},
|};
export type ShopLayoutContentQuery = {|
  variables: ShopLayoutContentQuery$variables,
  response: ShopLayoutContentQuery$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
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
    "kind": "Literal",
    "name": "visibility",
    "value": "ESHOP"
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
},
v5 = {
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
            "name": "searchAllPublishedProducts",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/)
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
            "name": "searchAllPublishedProducts",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
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
    "cacheID": "73696cef0cdcccaddb38685a438d102a",
    "id": null,
    "metadata": {},
    "name": "ShopLayoutContentQuery",
    "operationKind": "query",
    "text": "query ShopLayoutContentQuery(\n  $clientLocale: SupportedLocale!\n  $priceSortDirection: PriceSortDirection!\n) {\n  commerce {\n    products: searchAllPublishedProducts(clientLocale: $clientLocale, priceSortDirection: $priceSortDirection, visibility: ESHOP) {\n      key\n      name\n      price {\n        unitAmount\n        unitAmountCurrency\n      }\n      imageCover {\n        blurhash\n        url\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();

if (__DEV__) {
  (node/*: any*/).hash = "58597fd12ee384ee575ed69c889885a3";
}

module.exports = ((node/*: any*/)/*: Query<
  ShopLayoutContentQuery$variables,
  ShopLayoutContentQuery$data,
>*/);
