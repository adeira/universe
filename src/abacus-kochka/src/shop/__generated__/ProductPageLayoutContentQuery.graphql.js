/**
 * @generated SignedSource<<990271d48e48c05fdca603ce74207bef>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./x relay
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type SupportedCurrency = "MXN" | "%future added value";
export type SupportedLocale = "en_US" | "es_MX" | "%future added value";
export type ProductPageLayoutContentQuery$variables = {|
  clientLocale: SupportedLocale,
  productKey: string,
|};
export type ProductPageLayoutContentQuery$data = {|
  +commerce: {|
    +product: {|
      +name: string,
      +description: ?string,
      +price: {|
        +unitAmount: number,
        +unitAmountCurrency: SupportedCurrency,
      |},
      +images: $ReadOnlyArray<{|
        +blurhash: string,
        +url: string,
      |}>,
    |},
  |},
|};
export type ProductPageLayoutContentQuery = {|
  variables: ProductPageLayoutContentQuery$variables,
  response: ProductPageLayoutContentQuery$data,
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
    "name": "productKey"
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
    "name": "productKey",
    "variableName": "productKey"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
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
  "name": "images",
  "plural": true,
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
    "name": "ProductPageLayoutContentQuery",
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
            "alias": "product",
            "args": (v1/*: any*/),
            "concreteType": "Product",
            "kind": "LinkedField",
            "name": "getPublishedProductByKey",
            "plural": false,
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
    "name": "ProductPageLayoutContentQuery",
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
            "alias": "product",
            "args": (v1/*: any*/),
            "concreteType": "Product",
            "kind": "LinkedField",
            "name": "getPublishedProductByKey",
            "plural": false,
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
    "cacheID": "5920f31b7d3e796e0060483df77499c1",
    "id": null,
    "metadata": {},
    "name": "ProductPageLayoutContentQuery",
    "operationKind": "query",
    "text": "query ProductPageLayoutContentQuery(\n  $clientLocale: SupportedLocale!\n  $productKey: ID!\n) {\n  commerce {\n    product: getPublishedProductByKey(clientLocale: $clientLocale, productKey: $productKey) {\n      name\n      description\n      price {\n        unitAmount\n        unitAmountCurrency\n      }\n      images {\n        blurhash\n        url\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();

if (__DEV__) {
  (node/*: any*/).hash = "149f16b4e91ce7ffcb5d2b6eeb4baeaa";
}

module.exports = ((node/*: any*/)/*: Query<
  ProductPageLayoutContentQuery$variables,
  ProductPageLayoutContentQuery$data,
>*/);
