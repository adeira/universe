/**
 * @generated SignedSource<<8b6615d87f5a4e1bfaeac1dff02c4ba2>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./x relay
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
type ProductPageLayoutFragment$fragmentType = any;
export type SupportedLocale = "en_US" | "es_MX" | "%future added value";
export type ProductPageLayoutQuery$variables = {|
  clientLocale: SupportedLocale,
  productKey: string,
|};
export type ProductPageLayoutQuery$data = {|
  +$fragmentSpreads: ProductPageLayoutFragment$fragmentType,
|};
export type ProductPageLayoutQuery = {|
  response: ProductPageLayoutQuery$data,
  variables: ProductPageLayoutQuery$variables,
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ProductPageLayoutQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "ProductPageLayoutFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ProductPageLayoutQuery",
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
            "args": [
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
            "concreteType": "Product",
            "kind": "LinkedField",
            "name": "getPublishedProductByKey",
            "plural": false,
            "selections": [
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
              {
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
              },
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
    "cacheID": "8f4c1426923188ddcdb604d5c62874e5",
    "id": null,
    "metadata": {},
    "name": "ProductPageLayoutQuery",
    "operationKind": "query",
    "text": "query ProductPageLayoutQuery(\n  $clientLocale: SupportedLocale!\n  $productKey: ID!\n) {\n  ...ProductPageLayoutFragment\n}\n\nfragment ProductPageLayoutContentFragment on CommerceQuery {\n  product: getPublishedProductByKey(clientLocale: $clientLocale, productKey: $productKey) {\n    name\n    description\n    price {\n      unitAmount\n      unitAmountCurrency\n    }\n    images {\n      blurhash\n      url\n    }\n    id\n  }\n}\n\nfragment ProductPageLayoutFragment on Query {\n  commerce {\n    ...ProductPageLayoutContentFragment\n  }\n}\n"
  }
};
})();

if (__DEV__) {
  (node/*: any*/).hash = "05e4af8284ce9b50781421bec7c9bdc9";
}

module.exports = ((node/*: any*/)/*: Query<
  ProductPageLayoutQuery$variables,
  ProductPageLayoutQuery$data,
>*/);
