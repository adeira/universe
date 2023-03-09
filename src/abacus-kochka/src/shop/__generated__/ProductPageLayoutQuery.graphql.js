/**
 * @generated SignedSource<<f677806f8e1ee06c86f5ce0e152b3927>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./x relay
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
import type { ProductPageLayoutFragment$fragmentType } from "./ProductPageLayoutFragment.graphql";
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
    "cacheID": "0375928528b02deb8d2760c5aa62377f",
    "id": null,
    "metadata": {},
    "name": "ProductPageLayoutQuery",
    "operationKind": "query",
    "text": "query ProductPageLayoutQuery($clientLocale:SupportedLocale!,$productKey:ID!){...ProductPageLayoutFragment}fragment ProductPageLayoutContentFragment on CommerceQuery{product:getPublishedProductByKey(clientLocale:$clientLocale,productKey:$productKey){name,description,price{unitAmount,unitAmountCurrency},images{blurhash,url},id}}fragment ProductPageLayoutFragment on Query{commerce{...ProductPageLayoutContentFragment}}"
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
