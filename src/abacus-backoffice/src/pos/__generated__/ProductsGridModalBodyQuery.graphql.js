/**
 * @generated SignedSource<<d5efe729f0c9ed9cfc9ebe7ba27cd34a>>
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
export type ProductsGridModalBodyQuery$variables = {|
  clientLocale: SupportedLocale,
  productKey: string,
|};
export type ProductsGridModalBodyQuery$data = {|
  +commerce: {|
    +product: {|
      +name: string,
      +price: {|
        +unitAmount: number,
      |},
      +selectedAddons: $ReadOnlyArray<?{|
        +id: string,
        +name: string,
        +priceExtra: {|
          +unitAmount: number,
          +unitAmountCurrency: SupportedCurrency,
        |},
      |}>,
    |},
  |},
|};
export type ProductsGridModalBodyQuery = {|
  response: ProductsGridModalBodyQuery$data,
  variables: ProductsGridModalBodyQuery$variables,
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
v1 = {
  "kind": "Variable",
  "name": "clientLocale",
  "variableName": "clientLocale"
},
v2 = [
  (v1/*: any*/),
  {
    "kind": "Variable",
    "name": "productKey",
    "variableName": "productKey"
  }
],
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
  "kind": "ScalarField",
  "name": "unitAmount",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "concreteType": "Price",
  "kind": "LinkedField",
  "name": "price",
  "plural": false,
  "selections": [
    (v4/*: any*/)
  ],
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": [
    (v1/*: any*/)
  ],
  "concreteType": "ProductAddon",
  "kind": "LinkedField",
  "name": "selectedAddons",
  "plural": true,
  "selections": [
    (v6/*: any*/),
    (v3/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Price",
      "kind": "LinkedField",
      "name": "priceExtra",
      "plural": false,
      "selections": [
        (v4/*: any*/),
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ProductsGridModalBodyQuery",
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
            "args": (v2/*: any*/),
            "concreteType": "Product",
            "kind": "LinkedField",
            "name": "getPublishedProductByKey",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v5/*: any*/),
              (v7/*: any*/)
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
    "name": "ProductsGridModalBodyQuery",
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
            "args": (v2/*: any*/),
            "concreteType": "Product",
            "kind": "LinkedField",
            "name": "getPublishedProductByKey",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v5/*: any*/),
              (v7/*: any*/),
              (v6/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "63b801dc0dca303d78eec2e7ddbca86e",
    "id": null,
    "metadata": {},
    "name": "ProductsGridModalBodyQuery",
    "operationKind": "query",
    "text": "query ProductsGridModalBodyQuery($clientLocale:SupportedLocale!,$productKey:ID!){commerce{product:getPublishedProductByKey(clientLocale:$clientLocale,productKey:$productKey){name,price{unitAmount},selectedAddons(clientLocale:$clientLocale){id,name,priceExtra{unitAmount,unitAmountCurrency}},id}}}"
  }
};
})();

if (__DEV__) {
  (node/*: any*/).hash = "d5ba7882859f9abf1bca86496b5bc43e";
}

module.exports = ((node/*: any*/)/*: Query<
  ProductsGridModalBodyQuery$variables,
  ProductsGridModalBodyQuery$data,
>*/);
